import '../scss/global.scss';
import {initMobileMenu} from "./components/initMobileMenu";
import {getLog} from "./utils/getLog";

window.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  getLog('global')
})