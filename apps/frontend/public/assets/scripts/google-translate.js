const iframe = document.querySelector('iframe.VIpgJd-ZVi9od-xl07Ob-OEVmcd.skiptranslate');
console.log("iframe", iframe)
const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

const style = document.createElement('style');
style.textContent = `
  .VIpgJd-ZVi9od-vH1Gmf {
    border-radius: 5px !important;
    background-color: #FFF;
    text-decoration: none;
    border: 1px solid #6B90DA;
    overflow: hidden;
    padding: 4px;
  }
`;

iframeDocument.head.appendChild(style);