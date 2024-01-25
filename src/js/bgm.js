/**
 * Background manager
 *
 * @class Bgm
 */
class Bgm {
    /**
     * Creates an instance of Bgm.
     *
     * @param {String} element
     * @memberof Bgm
     */
    constructor(element){
        this.canvas = /** @type {HTMLCanvasElement} */ (document.querySelector(element));
        if (!this.canvas) throw new Error("No canvas found");
        this.context = this.canvas.getContext("2d");
    }

    #chars = "1234567890+-/*=√×÷πΣφ∞Π∫≈≠≤≥≈≡≜xyie∆≪≫∈Øℝ";
    #STAR_COUNT = (window.innerWidth + window.innerHeight) / 6;
    #STAR_SIZE = 3;
    #STAR_MIN_SCALE = 0.2;
    #OVERFLOW_THRESHOLD = 50;
    #pointerX = 0;
    #pointerY = 0;
    #touchInput = false;
    #width = 0;
    #height = 0;
    #scale = 1;
    #stars = [];
    #velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

    /**
     * Generate stars
     *
     * @memberof Bgm
     */
    #generate(){
        for (let i = 0; i < this.#STAR_COUNT; i++){
            this.#stars.push({
                x: 0,
                y: 0,
                z: this.#STAR_MIN_SCALE + Math.random() * (1 - this.#STAR_MIN_SCALE),
            });
        }
    }

    /**
     * Place star
     *
     * @param {{x: Number, y: Number, z: Number, t: String}} star
     * @memberof Bgm
     */
    #placeStar(star){
        star.x = Math.random() * this.#width;
        star.y = Math.random() * this.#height;
        star.t = this.#chars[Math.floor(Math.random() * this.#chars.length)];
    }

    /**
     * Recycle star
     *
     * @param {{x: Number, y: Number, z: Number, t: String}} star
     * @memberof Bgm
     */
    #recycleStar(star){
        let direction = "z";
        const vx = Math.abs(this.#velocity.x);
        const vy = Math.abs(this.#velocity.y);
        if (vx > 1 || vy > 1){
            let axis;
            if (vx > vy) axis = Math.random() < vx / (vx + vy) ? "h" : "v";
            else axis = Math.random() < vy / (vx + vy) ? "v" : "h";
            if (axis === "h") direction = this.#velocity.x > 0 ? "l" : "r";
            else direction = this.#velocity.y > 0 ? "t" : "b";
        }
        star.z = this.#STAR_MIN_SCALE + Math.random() * (1 - this.#STAR_MIN_SCALE);
        if (direction === "z"){
            star.z = 0.1;
            star.x = Math.random() * this.#width;
            star.y = Math.random() * this.#height;
        }
        else if (direction === "l"){
            star.x = -this.#OVERFLOW_THRESHOLD;
            star.y = this.#height * Math.random();
        }
        else if (direction === "r"){
            star.x = this.#width + this.#OVERFLOW_THRESHOLD;
            star.y = this.#height * Math.random();
        }
        else if (direction === "t"){
            star.x = this.#width * Math.random();
            star.y = -this.#OVERFLOW_THRESHOLD;
        }
        else if (direction === "b"){
            star.x = this.#width * Math.random();
            star.y = this.#height + this.#OVERFLOW_THRESHOLD;
        }
    }

    /**
     * Update stars
     *
     * @memberof Bgm
     */
    #update(){
        this.#velocity.tx *= 0.96;
        this.#velocity.ty *= 0.96;
        this.#velocity.x += (this.#velocity.tx - this.#velocity.x) * 0.8;
        this.#velocity.y += (this.#velocity.ty - this.#velocity.y) * 0.8;
        this.#stars.forEach((star) => {
            star.x += this.#velocity.x * star.z;
            star.y += this.#velocity.y * star.z;
            star.x += (star.x - this.#width / 2) * this.#velocity.z * star.z;
            star.y += (star.y - this.#height / 2) * this.#velocity.z * star.z;
            star.z += this.#velocity.z;
            if (
                star.x < -this.#OVERFLOW_THRESHOLD
                || star.x > this.#width + this.#OVERFLOW_THRESHOLD
                || star.y < -this.#OVERFLOW_THRESHOLD
                || star.y > this.#height + this.#OVERFLOW_THRESHOLD
            ){
                this.#recycleStar(star);
            }
        });
    }

    /**
     * Resize canvas
     *
     * @memberof Bgm
     */
    #resize(){
        this.#scale = window.devicePixelRatio || 1;
        this.#width = window.innerWidth * this.#scale;
        this.#height = window.innerHeight * this.#scale;
        this.canvas.width = this.#width;
        this.canvas.height = this.#height;
        this.#stars.forEach(star => this.#placeStar(star));
    }

    /**
     * Render stars
     *
     * @memberof Bgm
     */
    #render(){
        this.#stars.forEach((star) => {
            if (!this.context) return;

            this.context.font = (this.#STAR_SIZE * star.z * this.#scale * 6) + "px Arial";
            this.context.fillStyle = "#9f535a";
            const textX = star.x;
            const textY = star.y;
            let tailX = this.#velocity.x * 2;
            let tailY = this.#velocity.y * 2;
            if (Math.abs(tailX) < 0.1) tailX = 0.5;
            if (Math.abs(tailY) < 0.1) tailY = 0.5;
            this.context.fillText(star.t, textX + tailX, textY + tailY);
        });
    }

    /**
     * Step
     *
     * @return {void}
     * @memberof Bgm
     */
    #step(){
        if (!this.context) return;

        this.context.clearRect(0, 0, this.#width, this.#height);
        this.#update();
        this.#render();
        requestAnimationFrame(() => this.#step());
    }

    /**
     * Move pointer
     *
     * @param {Number} x
     * @param {Number} y
     * @memberof Bgm
     */
    #movePointer(x, y){
        if (typeof this.#pointerX === "number" && typeof this.#pointerY === "number"){
            const ox = x - this.#pointerX;
            const oy = y - this.#pointerY;
            this.#velocity.tx = this.#velocity.tx + ox / 150 * this.#scale * (this.#touchInput ? 1 : -1);
            this.#velocity.ty = this.#velocity.ty + oy / 150 * this.#scale * (this.#touchInput ? 1 : -1);
        }
        this.#pointerX = x;
        this.#pointerY = y;
    }

    /**
     * On mouse move
     *
     * @param {MouseEvent} event
     * @memberof Bgm
     */
    #onMouseMove(event){
        this.#touchInput = false;
        this.#movePointer(event.clientX, event.clientY);
    }

    /**
     * On touch move
     *
     * @param {TouchEvent} event
     * @memberof Bgm
     */
    #onTouchMove(event){
        this.#touchInput = true;
        this.#movePointer(event.touches[0].clientX, event.touches[0].clientY);
        event.preventDefault();
    }

    /**
     * On mouse leave
     *
     * @memberof Bgm
     */
    #onMouseLeave(){
        this.#pointerX = 0;
        this.#pointerY = 0;
    }

    /**
     * Initialize
     *
     * @memberof Bgm
     */
    init(){
        this.#generate();
        this.#resize();
        this.#step();

        window.onresize = () => this.#resize;
        this.canvas.onmousemove = e => this.#onMouseMove(e);
        this.canvas.ontouchmove = e => this.#onTouchMove(e);
        this.canvas.ontouchend = () => this.#onMouseLeave;
        document.onmouseleave = () => this.#onMouseLeave;
    }
}

export default Bgm;
