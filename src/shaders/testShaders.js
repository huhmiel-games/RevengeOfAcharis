const testFx = new Phaser.Class({
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
          vec2 texcoord = outTexCoord;
          texcoord.y = 1. - texcoord.y; // flip Y axis for Phaser 3
          gl_FragColor = texture2D(uMainSampler, texcoord);
        }
        `,
      });
    },
});

export default testFx;
