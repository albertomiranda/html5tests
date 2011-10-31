var tabSpace = '    '; //4 spaces
var fileDropElement = 'code';
$(document).ready(function(){
    //set code box height and bind to window resize event
    setCodeBoxSize();
    $(window).resize(setCodeBoxSize);
    
    //capture tab key
    $('#code').live('keydown', function(e) { 
        var keyCode = e.keyCode || e.which; 
        if (keyCode == 9) { 
        e.preventDefault(); 
            $('#code').insertAtCaret(tabSpace);
        } 
    });
    
    //focus code
    $('#code').focus();
    
    //set file drop
    setFileDrop();
    
    //add binding to load samples
    $('#sample').change(function(){
        if($('#sample').val()=='') return false;
        $.ajax({
            url: 'samples/' + $('#sample').val(),
            success: function(data){
                $('#code').val(data);
            }
        });
    });
});

function setFileDrop(){
    //add file drop listener to code box
    var drop = document.getElementById(fileDropElement);
    var savedContent = drop.value;
    var activeDragText = '//YEAH! Drag and drop mojo baby!';
    drop.addEventListener('dragenter', stopEventPropagation);
    drop.addEventListener('dragover', function(event){
        stopEventPropagation(event);
        drop.value = activeDragText;
    });
    drop.addEventListener('dragexit', stopEventPropagation);
    drop.addEventListener('dragleave', function(event){
        stopEventPropagation(event);
        if(drop.value == activeDragText){
            drop.value = savedContent;
        }
    });
    drop.addEventListener('drop', function(event) {
        stopEventPropagation(event);
        if (!window.FileReader) {
            $('#code').val('File reader not supported!');
            return false;
        }
        
        loadFile(event.dataTransfer.files[0]);
        return false;
    });
}

function stopEventPropagation(event){
    event.stopPropagation();
    event.preventDefault();
}

function setCodeBoxSize(){
    //alert('resize');
    //set code box height
    var height = $(window).height() - 300;
    $('#code').height(height);
}

function loadFile(file) {
    var reader = new FileReader();
    reader.onload = function(event) {
        $('#code').val(event.target.result);
    };

    reader.onerror = function() {
        alert('Unable to read ' + file.fileName);
    };

    reader.readAsText(file);
}

/**
 * Default Test methods.
 */
var DefaultTest = {
    /**
     * Evals passed code.
     * 
     * @author Alberto Miranda <alberto@nextive.com>
     * @param codeContainerId string
     */
    "execute": function(codeContainerId){
        eval($('#' + codeContainerId).val());
    }
};

//extend jquery adding insertAtCaret function
jQuery.fn.extend({
insertAtCaret: function(myValue){
  return this.each(function(i) {
    if (document.selection) {
      //For browsers like Internet Explorer
      this.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      this.focus();
    }
    else if (this.selectionStart || this.selectionStart == '0') {
      //For browsers like Firefox and Webkit based
      var startPos = this.selectionStart;
      var endPos = this.selectionEnd;
      var scrollTop = this.scrollTop;
      this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
      this.focus();
      this.selectionStart = startPos + myValue.length;
      this.selectionEnd = startPos + myValue.length;
      this.scrollTop = scrollTop;
    } else {
      this.value += myValue;
      this.focus();
    }
  })
}
});
