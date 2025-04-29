import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface HeroGraphicProps {
  followScroll?: boolean;
}

const HeroGraphic: React.FC<HeroGraphicProps> = ({ followScroll = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesMeshRef = useRef<THREE.Points | null>(null);
  const connectionsRef = useRef<THREE.Line[]>([]);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  
  // State to track scroll position
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Renderer setup with higher quality
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      precision: 'highp'
    });
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    
    // Add renderer to DOM
    mountRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const sizeArray = new Float32Array(particlesCount);
    
    // Create a more complex structure - double helix with clusters
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // Determine particle type (70% in helix, 30% in clusters)
      const particleType = Math.random();
      
      if (particleType < 0.7) {
        // Double helix pattern
        const t = (i / particlesCount) * Math.PI * 10;
        const radius = 2.5;
        const strand = Math.random() > 0.5 ? 1 : -1;
        
        posArray[i3] = Math.cos(t) * radius;
        posArray[i3 + 1] = Math.sin(t) * radius * strand;
        posArray[i3 + 2] = t * 0.3 - 5;
        
        // Colors for helix (blue to purple gradient)
        colorArray[i3] = 0.2 + Math.random() * 0.3; // R
        colorArray[i3 + 1] = 0.1 + Math.random() * 0.3; // G
        colorArray[i3 + 2] = 0.8 + Math.random() * 0.2; // B
        
        // Varying sizes
        sizeArray[i] = 0.03 + Math.random() * 0.04;
      } else {
        // Cluster particles
        const clusterCenter = new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6
        );
        
        posArray[i3] = clusterCenter.x + (Math.random() - 0.5) * 2;
        posArray[i3 + 1] = clusterCenter.y + (Math.random() - 0.5) * 2;
        posArray[i3 + 2] = clusterCenter.z + (Math.random() - 0.5) * 2;
        
        // Colors for clusters (cyan to teal)
        colorArray[i3] = 0.1 + Math.random() * 0.2; // R
        colorArray[i3 + 1] = 0.5 + Math.random() * 0.5; // G
        colorArray[i3 + 2] = 0.7 + Math.random() * 0.3; // B
        
        // Larger sizes for cluster particles
        sizeArray[i] = 0.05 + Math.random() * 0.05;
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Create texture for particles
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMTItMzBUMDE6Mzc6MjArMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjU3KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjU3KzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmJkMzYxMWMyLWE1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'
    );
    
    // Material with custom shader for glow effect
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
    
    // Create points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    particlesMeshRef.current = particlesMesh;
    
    // Add connections between nearby points with gradient colors
    const connectionsMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });
    
    const connections: THREE.Line[] = [];
    connectionsRef.current = connections;
    
    const maxConnections = 300;
    const connectionThreshold = 1.2;
    
    for (let i = 0; i < particlesCount; i++) {
      for (let j = i + 1; j < particlesCount && connections.length < maxConnections; j++) {
        const x1 = posArray[i * 3];
        const y1 = posArray[i * 3 + 1];
        const z1 = posArray[i * 3 + 2];
        
        const x2 = posArray[j * 3];
        const y2 = posArray[j * 3 + 1];
        const z2 = posArray[j * 3 + 2];
        
        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) + 
          Math.pow(y2 - y1, 2) + 
          Math.pow(z2 - z1, 2)
        );
        
        if (distance < connectionThreshold) {
          // Create line geometry with colors
          const lineGeometry = new THREE.BufferGeometry();
          
          // Positions
          const positions = new Float32Array([x1, y1, z1, x2, y2, z2]);
          lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          
          // Colors - gradient between the two points
          const colors = new Float32Array([
            colorArray[i * 3], colorArray[i * 3 + 1], colorArray[i * 3 + 2],
            colorArray[j * 3], colorArray[j * 3 + 1], colorArray[j * 3 + 2]
          ]);
          lineGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
          
          const line = new THREE.Line(lineGeometry, connectionsMaterial);
          scene.add(line);
          connections.push(line);
        }
      }
    }
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Add point light
    const pointLight = new THREE.PointLight(0x4080ff, 1, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);
    pointLightRef.current = pointLight;
    
    // Animation variables
    let frame = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    
    // Animation
    const animate = () => {
      frame = requestAnimationFrame(animate);
      
      if (!particlesMeshRef.current || !pointLightRef.current) return;
      
      // Smooth rotation towards target
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      
      particlesMeshRef.current.rotation.x = currentRotationY;
      particlesMeshRef.current.rotation.y = currentRotationX;
      
      // Rotate connections
      connectionsRef.current.forEach(line => {
        line.rotation.x = particlesMeshRef.current!.rotation.x;
        line.rotation.y = particlesMeshRef.current!.rotation.y;
      });
      
      // Pulse effect
      const time = Date.now() * 0.001;
      const pulse = Math.sin(time * 0.5) * 0.1 + 0.9;
      particlesMeshRef.current.scale.set(pulse, pulse, pulse);
      
      // Animate particles
      const positions = particlesMeshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        // Subtle movement for particles
        positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.002;
        positions[i3] += Math.cos(time + i * 0.1) * 0.002;
      }
      particlesMeshRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Animate point light
      pointLightRef.current.position.x = Math.sin(time) * 3;
      pointLightRef.current.position.y = Math.cos(time) * 3;
      pointLightRef.current.intensity = 1 + Math.sin(time * 2) * 0.5;
      
      // Apply scroll effects if enabled
      if (followScroll && particlesMeshRef.current) {
        // Calculate scroll percentage (0 to 1)
        const scrollPercent = scrollPosition / (document.body.scrollHeight - window.innerHeight);
        
        // Apply scroll-based transformations
        // 1. Bounce effect
        const bounceY = Math.sin(scrollPercent * Math.PI * 4) * 2;
        particlesMeshRef.current.position.y = bounceY;
        
        // 2. Rotation based on scroll
        particlesMeshRef.current.rotation.z = scrollPercent * Math.PI * 2;
        
        // 3. Scale effect
        const scaleEffect = 0.8 + Math.sin(scrollPercent * Math.PI * 3) * 0.2;
        particlesMeshRef.current.scale.x = pulse * scaleEffect;
        particlesMeshRef.current.scale.y = pulse * scaleEffect;
        particlesMeshRef.current.scale.z = pulse * scaleEffect;
        
        // 4. Color intensity based on scroll
        const colorIntensity = 0.8 + Math.sin(scrollPercent * Math.PI * 2) * 0.2;
        pointLightRef.current.intensity = colorIntensity * 1.5;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = width; // Keep it square
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      targetRotationX = mouseX * 1.0;
      targetRotationY = mouseY * 1.0;
    };
    
    // Touch interaction
    const handleTouchMove = (event: TouchEvent) => {
      if (!mountRef.current || !event.touches[0]) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      mouseX = ((event.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
      
      targetRotationX = mouseX * 1.0;
      targetRotationY = mouseY * 1.0;
      
      // Prevent scrolling
      event.preventDefault();
    };
    
    mountRef.current.addEventListener('mousemove', handleMouseMove);
    mountRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Auto-rotation when no interaction
    let autoRotationTimeout: number | null = null;
    
    const startAutoRotation = () => {
      let autoRotationTime = 0;
      
      const autoRotate = () => {
        autoRotationTime += 0.01;
        targetRotationX = Math.sin(autoRotationTime) * 0.5;
        targetRotationY = Math.cos(autoRotationTime * 0.7) * 0.3;
        
        autoRotationTimeout = requestAnimationFrame(autoRotate);
      };
      
      autoRotate();
    };
    
    const stopAutoRotation = () => {
      if (autoRotationTimeout !== null) {
        cancelAnimationFrame(autoRotationTimeout);
        autoRotationTimeout = null;
      }
    };
    
    const handleMouseEnter = () => {
      stopAutoRotation();
    };
    
    const handleMouseLeave = () => {
      startAutoRotation();
    };
    
    mountRef.current.addEventListener('mouseenter', handleMouseEnter);
    mountRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    // Start auto-rotation initially
    startAutoRotation();
    
    // Scroll event handler
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    // Add scroll listener if followScroll is enabled
    if (followScroll) {
      window.addEventListener('scroll', handleScroll);
    }
    
    // Cleanup
    return () => {
      cancelAnimationFrame(frame);
      if (autoRotationTimeout !== null) {
        cancelAnimationFrame(autoRotationTimeout);
      }
      
      window.removeEventListener('resize', handleResize);
      if (followScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
      
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
        mountRef.current.removeEventListener('touchmove', handleTouchMove);
        mountRef.current.removeEventListener('mouseenter', handleMouseEnter);
        mountRef.current.removeEventListener('mouseleave', handleMouseLeave);
        if (rendererRef.current) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      
      if (sceneRef.current && particlesMeshRef.current) {
        sceneRef.current.remove(particlesMeshRef.current);
        particlesMeshRef.current.geometry.dispose();
        (particlesMeshRef.current.material as THREE.Material).dispose();
      }
      
      if (connectionsRef.current.length > 0 && sceneRef.current) {
        connectionsRef.current.forEach(line => {
          sceneRef.current?.remove(line);
          line.geometry.dispose();
        });
      }
      
      if (sceneRef.current) {
        sceneRef.current.remove(ambientLight);
        if (pointLightRef.current) {
          sceneRef.current.remove(pointLightRef.current);
        }
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [followScroll, scrollPosition]);
  
  return (
    <div 
      ref={mountRef} 
      className="w-full h-full flex items-center justify-center"
      style={{ minHeight: '400px', cursor: 'move' }}
    />
  );
};

export default HeroGraphic;
