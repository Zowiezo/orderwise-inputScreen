$(document).ready(function() {
  let charLimit = 1000;
  let lineCounter = 1;

  function updateBottomText() {
      let fullText = "";
      $('.feedback-input').each(function() {
          fullText += $(this).val() + "\n";
      });
      $('#bottom-text').val(fullText);

      if (fullText.length > charLimit) {
          $('#bottom-text').css('font-size', '12px');
      } else {
          $('#bottom-text').css('font-size', '16px');
      }
  }

  function updateLineLabels() {
      $('.input-box').each(function(index) {
          $(this).find('label').text('New Line ' + (index + 1) + ':');
      });
  }

  function addNewLine() {
      let inputBox = $('<div class="input-box"><label for="input-' + ($('.input-box').length + 1) + '">New Line ' + (lineCounter + 1) + ':</label><input type="text" id="input-' + ($('.input-box').length + 1) + '" class="feedback-input" maxlength="40"><button class="new-line-btn">New Line</button><button class="remove-btn">X</button></div>');
      $('.input-box:last').after(inputBox);
      inputBox.find('.feedback-input').focus();
      lineCounter++;
      updateLineLabels();
  }

  $('.feedback-input').on('input', function() {
      updateBottomText();
  });

  $(document).on('click', '.remove-btn', function() {
      let inputBox = $(this).parent();
      let inputValue = inputBox.find('.feedback-input').val();

      if (inputValue && !confirm("Are you sure you want to remove this line?")) {
          return;
      }

      inputBox.remove();
      updateLineLabels();
      updateBottomText();
  });

  $(document).on('click', '.new-line-btn', function() {
      addNewLine();
  });

  $('.feedback-input').each(function(index) {
      if (index % 2 !== 0) {
          $(this).css('background-color', '#f2f2f2');
      }
  });

  $('.feedback-input').on('input', function() {
      if ($(this).val().length >= 40) {
          addNewLine();
      }
  });

  $('.feedback-input').attr('maxlength', '40');
});
