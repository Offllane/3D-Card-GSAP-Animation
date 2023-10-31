document.addEventListener('DOMContentLoaded', () => {
  console.log('JS downloaded successfully');
  let clientX;
  let clientY;
  let cX;
  let cY

  const body = document.querySelector('body');
  cX = window.innerWidth / 2;
  cY = window.innerHeight / 2;

  body.addEventListener('mousemove', event => {
    clientX = event.pageX;
    clientY = event.pageY;

    requestAnimationFrame(updateMe);
  });

  function updateMe() {
    let dX = clientX - cX;
    let dY = clientY - cY;
    let tiltX = dY / cY;
    let tiltY = dX / cX;
    let radius = Math.sqrt(Math.pow(tiltX, 2) + Math.pow(tiltY, 2));
    let degree = radius * 12;
    gsap.to('.introduction__wrapper', 1, {
      transform: `rotate3d(${tiltX}, ${tiltY}, 0, ${degree}deg)`
    })
  }
})