const heatFx = new Phaser.Class({
  Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
  initialize:
    function CustomPipeline2(game) {
      Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
        game,
        renderer: game.renderer,
        fragShader: `
          precision mediump float;
          uniform float     time;
          uniform vec2      resolution;
          uniform sampler2D uMainSampler;
          varying vec2 outTexCoord;

          void main( void ) {
            vec2 uv = outTexCoord;
            uv.x = uv.x + sin((uv.y + time)*10.0 ) * 0.0015;
            //uv.x += (cos((uv.y + (time * 1.0)) * 3.0) * 0.001) + (sin((uv.y + (time * 0.8)) * 6.0) * 0.001);
            //uv.y += (sin((uv.x + (time * 1.5)) * 2.0) * 0.005) + (sin((uv.x + (time * 0.8)) * 6.0) * 0.01);
            vec4 texColor = texture2D(uMainSampler, uv);
            gl_FragColor = texColor;
          }
        `,
      });
    },
});

export default heatFx;
