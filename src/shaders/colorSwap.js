const colorSwapFx = new Phaser.Class({
  Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
  initialize:
    function CustomPipeline(game) {
      Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
        game,
        renderer: game.renderer,
        fragShader: `
        precision lowp float;
        uniform float alpha;
        varying vec2 outTexCoord;
        varying vec4 outTint;
        uniform sampler2D uMainSampler;
        uniform float time;

        

        void main () {
        
          float flash = abs(sin(time))+0.06;
          float rndtime = abs(sin(time)) * 1000.0;
          float randnumber = 255.0 / rndtime;
          vec4 color = vec4(0.799, 1.0, 0.0, 1.0);
          vec4 final = color ;

          

            gl_FragColor = texture2D(uMainSampler, outTexCoord) * color;
        }
        `,
      });
    },
});

export default colorSwapFx;
