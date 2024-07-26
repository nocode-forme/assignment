function getValues() {
    return [
      document.querySelector('input[name="date"]').value,
      document.querySelector('select[name="hour"]').value,
      document.querySelector('select[name="minute"]').value,
      document.querySelector('select[name="restaurant"]').value,
      document.querySelector('select[id="salut"]').value,
      document.querySelector('input[id="first-name"]').value,
      document.querySelector('input[id="last-name"]').value,
      document.querySelector('input[id="email"]').value,
    ];
  }