$(document).ready(function () {
    console.log("document ready")
    $('.ui.slider')
});


$(document).ready(function () {
    addColourRow();
    movementTypeChanged();
});

function addColourRow(){
    let tableBody = $("#colours");
    let n = $('#colours>tr').length;

    let row = `
    <tr id="colour_${n}">
        <td>
            <input type="color" placeholder="Select a color">
        </td>
        <td>
            <div class="ui slider" id="pixel-count-slider_${n}"></div>
            <input type="hidden" name="pixel-count_${n}" id="pixel-count-input_${n}">
        </td>
        <td>
            <div id="selected-pixel-count_${n}">300</div>
        </td>
    </tr>`

    tableBody.append(row);


    $(`#pixel-count-slider_${n}`).slider({
        min: 1,
        max: 600,
        start: 300,
        onChange: function (value) {
            // Update the input field value
            $(`#pixel-count-input_${n}`).val(value);
            // Update the displayed value
            $(`#selected-pixel-count_${n}`).text(value);
        }
    });

}


function movementTypeChanged(){
    let movementType = $("#movement-type").val();
    let descriptionId = `${movementType}-description`;
    $(".movement-type-description").hide();
    $(`#${descriptionId}`).show();
}