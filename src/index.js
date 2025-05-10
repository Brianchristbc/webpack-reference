import { greeting } from "./greeting";
import "./styles.css";
import testImage from "./odin.png";

console.log(greeting);
const image = document.createElement("img");
image.src = testImage;
document.body.append(image);
