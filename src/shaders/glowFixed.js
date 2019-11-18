const glowFixedFx = new Phaser.Class({
  Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
  initialize:
    function CustomPipeline(game) {
      Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
        game,
        renderer: game.renderer,
        fragShader: `
        precision lowp float;
          varying vec2 outTexCoord;
          varying vec4 outTint;
          uniform sampler2D uMainSampler;
          uniform float alpha;
          uniform float time;
          void main() {
            vec4 sum = vec4(0);
            vec2 texcoord = outTexCoord;
            for(int xx = -3; xx <= 3; xx++) {
              for(int yy = -3; yy <= 3; yy++) {
                float dist = sqrt(float(xx*xx) + float(yy*yy));
                float factor = 0.0;
                if (dist == 0.0) {
                  factor = 2.0;
                } else {
                  factor = 2.0/abs(float(dist));
                }
                sum += texture2D(uMainSampler, texcoord + vec2(xx, yy) * time); // * (abs(sin(time))+0.06);
              }
            }
            gl_FragColor = sum * 0.025 + texture2D(uMainSampler, texcoord)*alpha;
          }

        `,
      });
    },
});

export default glowFixedFx;

// lines shader
// fragShader: `
//           precision mediump float;
//           uniform float     time;
//           uniform vec2      resolution;
//           uniform sampler2D uMainSampler;
//           varying vec2 outTexCoord;

//           void main( void ) {
//             vec2 uv = outTexCoord;
//             //uv.x += (sin((uv.y - (time * 1.0)) * 2.0) * 0.002) + (sin((uv.y - (time * 0.2)) * 6.0) * 0.001);
//             //uv.y += (sin((uv.x + (time * 1.5)) * 2.0) * 0.0005) + (sin((uv.x + (time * 0.2)) * 6.0) * 0.001);
//             vec4 texColor = texture2D(uMainSampler, uv);
//             texColor -= mod( gl_FragCoord.y, 2.0 ) < 1.0 ? 0.01 : 0.0;
//             gl_FragColor = texColor;
//           }
//         `
