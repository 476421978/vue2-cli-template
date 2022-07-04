import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, Color, AxesHelper } from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Template {
  constructor() {
    this.el = document.getElementById('three-container')
    this.PCamera = {
      fov: 45,
      aspect: this.el.clientWidth / this.el.clientHeight,
      near: 1,
      far: 1000
    }
    this.cameraPostion = new Vector3(0, 0, 1)
    this.cameraLookAt = new Vector3(0, 0, 0)
    this.rendererColor = new Color(0x000000)
    this.rendererWidth = this.el.clientWidth
    this.rendererHeight = this.el.clientHeight
  }

  // 创建场景对象Scene
  initScene() {
    this.scene = new Scene()
  }

  // 初始化相机
  initPerspectiveCamera() {
    const camera = new PerspectiveCamera(this.PCamera.fov, this.PCamera.aspect, this.PCamera.near, this.PCamera.far)
    camera.position.copy(this.cameraPostion)
    camera.lookAt(this.cameraLookAt)
    this.camera = camera
    this.scene.add(camera)

    // /** 辅助坐标 start */
    // // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    // var axisHelper = new AxesHelper(250)
    // this.scene.add(axisHelper)
    // /** 辅助坐标 end */
  }

  //  创建渲染器对象
  initRenderer() {
    const renderer = new WebGLRenderer({
      antialias: true
    })
    renderer.setClearColor(this.rendererColor)
    renderer.setSize(this.rendererWidth, this.rendererHeight)
    this.el.appendChild(renderer.domElement)
    this.renderer = renderer

    // 可移动
    // new OrbitControls(this.camera, this.renderer.domElement)
  }

  init() {
    this.initScene()
    this.initPerspectiveCamera()
    this.initRenderer()
  }
}
