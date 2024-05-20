const powerButton = document.getElementById('powerButton');

// Atualiza o estado do botão com base no estado salvo
chrome.storage.local.get(['extensionEnabled'], function(result) {
  if (result.extensionEnabled) {
    powerButton.textContent = 'Active';
    powerButton.classList.add('on');
    powerButton.classList.remove('off');
  } else {
    powerButton.textContent = 'Disabled';
    powerButton.classList.add('off');
    powerButton.classList.remove('on');
  }
});

// Altera o estado da extensão ao clicar no botão
powerButton.addEventListener('click', () => {
  chrome.storage.local.get(['extensionEnabled'], function(result) {
    const newState = !result.extensionEnabled;
    chrome.storage.local.set({ extensionEnabled: newState }, function() {
      if (newState) {
        powerButton.textContent = 'Active';
        powerButton.classList.add('on');
        powerButton.classList.remove('off');
      } else {
        powerButton.textContent = 'Disabled';
        powerButton.classList.add('off');
        powerButton.classList.remove('on');
      }
      // Recarrega a aba ativa para aplicar/desaplicar o content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });
});
