function listenForUpload() {
  waitForElement('#original-filename').then((elm) => {
    const realFileName = elm.innerText;
    const videoTitleInput = document.getElementById('textbox');

    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.display = 'flex';
    buttonsDiv.style.justifyContent = 'space-evenly';
    buttonsDiv.style.marginBottom = '10px';

    const button1 = document.createElement('button');
    const button2 = document.createElement('button');
    const button3 = document.createElement('button');

    button1.innerText = 'Use filename as title';
    button1.addEventListener('click', () => {
      videoTitleInput.innerText = realFileName;
    });

    button2.innerText = 'URL decode';
    button2.addEventListener('click', () => {
      videoTitleInput.innerText = decodeURIComponent(videoTitleInput.innerText);
    });

    button3.innerText = 'Remove extension';
    button3.addEventListener('click', () => {
      videoTitleInput.innerText = videoTitleInput.innerText.replace(/\.[^/.]+?$/, '');
    });

    buttonsDiv.appendChild(button1);
    buttonsDiv.appendChild(button2);
    buttonsDiv.appendChild(button3);

    document.getElementById('basics').prepend(buttonsDiv);

    waitForNoElement('#original-filename').then(() => {
      listenForUpload();
    });
  });
}

listenForUpload();

