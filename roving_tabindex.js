'use strict';

class rovingTabindex {
  constructor(groupNode) {
    this.items = Array.from(groupNode);
    this.firstItem = null;
    this.lastItem = null;
    this.previouslyFocused = null;

    for (var i = 0; i < this.items.length; i += 1) {
      var item = this.items[i];
      item.tabIndex = -1;
      item.setAttribute('data-selected', 'false');
      item.addEventListener('keydown', this.onKeydown.bind(this));

      if (!this.firstItem) {
        this.firstItem = item;
      }
      this.lastItem = item;
    }

    this.setSelectedItem(this.firstItem);
  }

  setSelectedItem(currentItem) {
    for (var i = 0; i < this.items.length; i += 1) {
      var item = this.items[i];
      if (currentItem === item) {
        item.setAttribute('data-selected', 'true');
        item.tabIndex = 0;
      } else {
        item.setAttribute('data-selected', 'false');
        item.tabIndex = -1;
      }
    }
  }

  moveFocusToItem(currentItem) {
    currentItem.focus();
  }

  moveFocusToPreviousItem(currentItem) {
    var index;

    if (currentItem === this.firstItem) {
      this.moveFocusToItem(this.lastItem);
    } else {
      index = this.items.indexOf(currentItem);
      this.moveFocusToItem(this.items[index - 1]);
    }
  }

  moveFocusToNextItem(currentItem) {
    var index;

    if (currentItem === this.lastItem) {
      this.moveFocusToItem(this.firstItem);
    } else {
      index = this.items.indexOf(currentItem);
      this.moveFocusToItem(this.items[index + 1]);
    }
  }
  /* EVENT HANDLERS */
  onKeydown(event) {
    this.previouslyFocused = event.currentTarget;

    switch (event.code) {
      case 'ArrowLeft':
        this.moveFocusToPreviousItem(this.previouslyFocused);
        break;

      case 'ArrowRight':
        this.moveFocusToNextItem(this.previouslyFocused);
        break;

      case 'ArrowUp':
        this.moveFocusToPreviousItem(this.previouslyFocused);
        break;

      case 'ArrowDown':
        this.moveFocusToNextItem(this.previouslyFocused);
        break;
    
      // when user moves tabs from the group
      case 'Tab':
        this.setSelectedItem(this.previouslyFocused);
        break;

      // when user moves shift+tabs from the group
      case 'ShiftLeft':
        this.setSelectedItem(this.previouslyFocused);
        break;

      default:
        break;
    }
  }
}

// Initialize list of elements included in roving tabindex
window.addEventListener('load', function () {
  // Select the group of elements to include in the roving tabindex
  var itemlists = document.querySelectorAll('[class="book-card__link"]');
  for (var i = 0; i < itemlists.length; i++) {
    new rovingTabindex(itemlists);
  }

});
