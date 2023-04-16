/* global sharkViewer */
let s = null;
let mdata;


function readSwcFile(e) {
 const f = e.target.files[0];
  if (f) {
    const r = new FileReader();
    r.onload = (e2) => {
      let swcTxt = e2.target.result;
      let swc = sharkViewer.swcParser(swcTxt);
      if (Object.keys(swc).length > 0) {
        console.log("readSwcFile swc ", swc)
        console.log("readSwcFile swcTxt ", swcTxt)
        // s.loadNeuron('foo', '#ff0000', swc, true, false, true);   这样子加载的只有红色
        s.loadNeuron('foo', null, swc, true, false, true);
        s.render();
        return swc, swcTxt
      } else {
        alert("Please upload a valid swc file.");
      }
    };
    r.readAsText(f);
  } else {
    alert("Failed to load file");
  }
}

function readObjFile(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const objText = event.target.result;
      s.loadCompartment('foo', '#ff0000', objText);
      s.render();
    };
    reader.readAsText(file);
  }
}


window.onload = () => {
  // setInterval(function() {
  //   console.log("循环监听。。。。。")
  //   let swc = document
  //       .getElementById("swc_input")
  //       .addEventListener("change", readSwcFile, true);
  //   if(swc){
  //     mdata = JSON.parse(document.getElementById("metadata_swc").text);
  //     s = new sharkViewer.default({
  //       animated: false,
  //       mode: 'particle',
  //       dom_element: document.getElementById('container'),
  //       metadata: mdata,
  //       showAxes: 10000,
  //       showStats: true,
  //       maxVolumeSize: 5000,
  //       cameraChangeCallback: () => { }
  //     });
  //     window.s = s;
  //     s.init();
  //     s.animate();
  //     // const swc2 = sharkViewer.swcParser(document.getElementById("swc2").text);
  //     // s.loadNeuron('swc2', '#ff0000', swc2);
  //     s.loadNeuron('swc', null, swc, true, false, true);
  //     s.render();
  //   }
  // },1000)

  // TODO： 目前存在一个BUG 读了test.swc，再读其他swc就没法覆盖， 但是读test-副本再读test可以被覆盖
  // 应该是与 s.loadNeuron 的onTopable参数函数相关，即s.loadNeuron并不是刷新，而是在原来的基础上继续渲染，所以就导致上面的现象
  // 查看loadNeuron的源码 最后一句是  scene.add(neuron) 即每一次加载都是添加骨架 并非覆盖重新刷新
  // 这也符合neuroglancer的作用，点击一个segment就是添加一个segment 所以这是合理的
  let swc, swcTxt = document
      .getElementById("swc_input")
      .addEventListener("change", readSwcFile, false);
  console.log("swc ", swc)
  console.log("swcTxt ", swcTxt)

  document
    .getElementById("obj_input")
    .addEventListener("change", readObjFile, false);

  // swc默认渲染 index.html中的swc DOM
  // swc = sharkViewer.swcParser(document.getElementById("swc").text);
  mdata = JSON.parse(document.getElementById("metadata_swc").text);
  s = new sharkViewer.default({
    animated: false,
    mode: 'particle',
    dom_element: document.getElementById('container'),
    metadata: mdata,
    showAxes: 10000,
    showStats: true,
    maxVolumeSize: 5000,
    cameraChangeCallback: () => { }
  });
  window.s = s;
  s.init();
  s.animate();
  // const swc2 = sharkViewer.swcParser(document.getElementById("swc2").text);
  // s.loadNeuron('swc2', '#ff0000', swc2);

  if(swc) {
    s.loadNeuron('swc', null, swc, true, false, true);
  }
  s.render();
};
