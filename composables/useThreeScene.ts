import * as THREE from 'three'

export const useThreeScene = () => {
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let particles: THREE.Points
  let animationId: number
  let mouseX = 0
  let mouseY = 0

  const initScene = (canvas: HTMLCanvasElement) => {
    // Scene setup
    scene = new THREE.Scene()

    // Camera setup
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Particle system
    createParticles()

    // Event listeners
    window.addEventListener('resize', onWindowResize)
    window.addEventListener('mousemove', onMouseMove)

    // Start animation
    animate()
  }

  const createParticles = () => {
    const particlesCount = 2000
    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20

      // Color
      const color = new THREE.Color()
      color.setHSL(Math.random() * 0.1 + 0.05, 0.8, 0.6)
      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })

    particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Add floating cubes
    createFloatingCubes()

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2)
    scene.add(ambientLight)

    // Add point light
    const pointLight = new THREE.PointLight(0xff6b35, 1, 100)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)
  }

  const createFloatingCubes = () => {
    const cubeGroup = new THREE.Group()

    for (let i = 0; i < 15; i++) {
      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      const material = new THREE.MeshPhongMaterial({
        color: 0xff6b35,
        transparent: true,
        opacity: 0.6,
        wireframe: Math.random() > 0.5
      })

      const cube = new THREE.Mesh(geometry, material)
      cube.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      )
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )

      cubeGroup.add(cube)
    }

    scene.add(cubeGroup)
  }

  const animate = () => {
    animationId = requestAnimationFrame(animate)

    // Rotate particles
    if (particles) {
      particles.rotation.x += 0.001
      particles.rotation.y += 0.002
    }

    // Mouse interaction
    camera.position.x += (mouseX * 0.01 - camera.position.x) * 0.02
    camera.position.y += (-mouseY * 0.01 - camera.position.y) * 0.02
    camera.lookAt(scene.position)

    // Animate floating cubes
    scene.traverse(child => {
      if (
        child instanceof THREE.Mesh &&
        child.geometry instanceof THREE.BoxGeometry
      ) {
        child.rotation.x += 0.01
        child.rotation.y += 0.01
        child.position.y += Math.sin(Date.now() * 0.001 + child.id) * 0.001
      }
    })

    renderer.render(scene, camera)
  }

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  const onMouseMove = (event: MouseEvent) => {
    mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
    mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
  }

  const updateScrollProgress = (progress: number) => {
    if (particles) {
      particles.rotation.z = progress * Math.PI * 2
    }

    // Update camera position based on scroll
    camera.position.z = 5 + progress * 10
  }

  const dispose = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }

    window.removeEventListener('resize', onWindowResize)
    window.removeEventListener('mousemove', onMouseMove)

    if (renderer) {
      renderer.dispose()
    }

    if (scene) {
      scene.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose())
          } else {
            child.material.dispose()
          }
        }
      })
    }
  }

  return {
    initScene,
    updateScrollProgress,
    dispose
  }
}
