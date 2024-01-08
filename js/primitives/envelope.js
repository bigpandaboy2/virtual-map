class Envelope {
    constructor(skeleton, width, roundess = 0 ) {
        if (skeleton) {
            this.skeleton = skeleton;
            this.poly = this.#generatePolygon(width, roundess);
        }
    }

    static load(info) {
        const env = new Envelope();
        env.skeleton = new Segment(info.skeleton.p1, info.skeleton.p2);
        env.poly = Polygon.load(info.poly);
        return env;
     }

    #generatePolygon(width, roundess) {
        const { p1, p2 } = this.skeleton;

        const radius = width / 2;
        const alpha = angle(subtract(p1, p2));
        const alpha_cw = alpha + Math.PI / 2;
        const alpha_ccw = alpha - Math.PI / 2;
        // const p1_ccw = translate(p1, alpha_ccw, radius);
        // const p2_ccw = translate(p2, alpha_ccw, radius);
        // const p2_cw = translate(p2, alpha_cw, radius);
        // const p1_cw = translate(p1, alpha_cw, radius);
        const points = [];
        const step = Math.PI / Math.max(1, roundess);
        const eps = step / 2;
        for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
            points.push(translate(p1, i, radius));
        }
        for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
            points.push(translate(p2, Math.PI + i, radius));
        }

        // return new Polygon([p1_ccw, p2_ccw, p2_cw, p1_cw]);
        return new Polygon(points);
    }

    draw(ctx, options) {
        this.poly.draw(ctx, options);
        //this.poly.drawSegments(ctx);
    }
}