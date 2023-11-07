document.addEventListener('DOMContentLoaded', () => {
  console.log('JS downloaded successfully');
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('aura');
  const buttons = document.getElementsByTagName('button');
  let clientX;
  let clientY;
  let cX;
  let cY;
  let mouseX = 0;
  let mouseY = 0;
  let posX = 0;
  let posY = 0;

  const body = document.querySelector('body');
  cX = window.innerWidth / 2;
  cY = window.innerHeight / 2;

  body.addEventListener('mousemove', event => {
    clientX = event.pageX;
    clientY = event.pageY;
    cursor.classList.remove('hidden');
    follower.classList.remove('hidden');

    requestAnimationFrame(updateMe);
    requestAnimationFrame(mouseCoords.bind(this, event));
  });

  body.addEventListener('mouseout', () => {
    cursor.classList.add('hidden');
    follower.classList.add('hidden');
  });

  body.addEventListener('mousedown', () => {
    cursor.classList.add('hidden');
    follower.classList.add('hidden');
  });

  body.addEventListener('mouseup', () => {
    setTimeout(() => {
      cursor.classList.remove('hidden');
      follower.classList.remove('hidden');
    }, 300);
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

  function mouseCoords(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
  }

  for (let button of buttons) {
    button.addEventListener('mouseover', () => {
      cursor.classList.add('active');
      follower.classList.add('active');
    });
    button.addEventListener('mouseout', () => {
      cursor.classList.remove('active');
      follower.classList.remove('active');
    });
  }

  gsap.to({}, .01, {
    repeat: -1,
    onRepeat: () => {
      posX += (mouseX - posX) / 8;
      posY += (mouseY - posY) / 8;

      gsap.set(cursor, {
        css: {
          left: mouseX,
          top: mouseY
        }
      });

      gsap.set(follower, {
        css: {
          left: posX - 34,
          top: posY - 34
        }
      });
    }
  });
});