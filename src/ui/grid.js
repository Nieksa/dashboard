﻿var _selectedCellId;
var _affectedCellId;
var _event = false;

(function () {
    var cells = document.getElementsByClassName("cell");

    if (cells && cells.length > 0) { 
        for (var i = 0; i < cells.length; i++) {
            var obj = cells[i];
            obj.addEventListener("mousedown", GetCellAttributes);
            obj.addEventListener("mousedown", CreatePlaceHolder);
            obj.addEventListener("mousemove", ValidateElement);
        }
    }

    document.addEventListener("mouseup", RemovePlaceHolder);
    document.addEventListener("mouseup", FinalizeCellRepositioning);
    document.addEventListener("mousemove", SetPlaceholderPosition);
})();

function GetCellAttributes(e) {
    _selectedCellId = $(this).attr('id');
    $(this).removeClass("inactiveCell").addClass("selectedCell");
    
    var scTag = document.getElementById("selectedCellText");
    _event = true;
}

function ValidateElement(e) {
    if(_event){
    
        if(_affectedCellId != undefined){
            $("#" + _affectedCellId).removeClass("validCell").addClass("inactiveCell");
        }
        
        _affectedCellId = $(this).attr('id');
        $(this).removeClass("inactiveCell").addClass("validCell");
        var acTag = document.getElementById("affectedCellText");
    }
}

function FinalizeCellRepositioning(e) {
    var affectedCell = document.getElementById(_affectedCellId);
    var selectedCell = document.getElementById(_selectedCellId);
    
    if (affectedCell == undefined || selectedCell == undefined) {
        return;
    }
    
    var affectedCellIndex = ChildIndex(affectedCell);
    var selectedCellIndex = ChildIndex(selectedCell);
    
    selectedCell.style.position = "";
    selectedCell.style.left = "";
    selectedCell.style.left = "";
    
    if (affectedCellIndex > selectedCellIndex) {
        affectedCell.parentNode.insertBefore(selectedCell, affectedCell.nextSibling);
    } else {
        affectedCell.parentNode.insertBefore(selectedCell, affectedCell);
    }
    
    affectedCell.classList.remove("validCell");
    affectedCell.classList.add("inactiveCell");  
    selectedCell.classList.remove("selectedCell");
    
    _event = false;
}

function CreatePlaceHolder(){
    var tag = document.createElement('p');
    var placeholder = document.createElement('div');
    placeholder.id = "placeholder";
    placeholder.className = "placeholder";
    placeholder.style.border = "";
    placeholder.appendChild(tag);
    
    document.getElementById("grid").appendChild(placeholder);
}

function RemovePlaceHolder(){
    var placeholder = document.getElementById("placeholder");  
    
    if (placeholder != undefined) {
        document.getElementById("grid").removeChild(placeholder);
    }
}

function SetPlaceholderPosition(e) {
    if (!_event) return;

    var x = e.pageX;
    var y = e.pageY;
    var cell = document.getElementById("placeholder");
    
    if (cell != undefined) {
        cell.style.position = "absolute";
        cell.style.opacity = "0.5";
        cell.style.left = x - 150 + "px";
        cell.style.top = y - 150 + "px";
    }
}