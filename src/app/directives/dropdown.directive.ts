import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    standalone: false,
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') toggleDropdown() {
    // We target the dropdown menu within the clicked element (the li with the 'dropdown' class)
    const dropdown = this.el.nativeElement.querySelector('.dropdown-menu');

    // If the dropdown is not found, we simply return (no action taken)
    if (!dropdown) {
      return;
    }

    const isVisible = dropdown.classList.contains('show');

    // Toggle the 'show' class to handle visibility
    if (isVisible) {
      this.renderer.removeClass(dropdown, 'show');
    } else {
      this.renderer.addClass(dropdown, 'show');
    }
  }
}

