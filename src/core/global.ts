import { Core } from "./core";
import { TextureManager } from "./textures";


declare global {
  var GL: WebGLRenderingContext;
  var Engine: Core;
  var TextureManager: TextureManager;
}
