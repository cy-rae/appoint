import {useQuasar} from 'quasar';

/**
 * This utils class is responsible for the color changes of the web application.
 */
export class ThemeUtils {
  private _q = useQuasar();

  /**
   * Toggle the dark mode and update theme color meta tag.
   */
  changeTheme(){
    this._q.dark.toggle();
    this.setThemeColor();
  }

  // TODO: Test if this is needed
  /**
   * Change the theme color meta tag. This tag specifies the safety insets of the mobile device (corners next to camera
   * and search bar).
   */
  private setThemeColor(){
    // Change theme color.
    const themeColorMeta = document.getElementById('theme-color-meta');
    if(themeColorMeta){
      if(this._q.dark.isActive){
        themeColorMeta.setAttribute('content', '#212121');
      } else {
        themeColorMeta.setAttribute('content', '#155195');
      }
    }
  }
}
