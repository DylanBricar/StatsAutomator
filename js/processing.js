/**
 * Creates a stretch on the given histogram on the given bits.
 */
function processingStretching() {
    const histo = $("#processingStretching_values").val().split(";");
    const exponent = $("#processingStretching_exponent").val();
    let array_count = [];
    let newArray = [];

    for (let i = 0; i < histo.length; i++) {
        let count = 0;
        for (let j = 0; j < histo.length; j++) {
            if (histo[j] == histo[i]) {
                count++;
            };
        }
        array_count[histo[i]] = count;
    }
    withoutDupli = removeDuplicates(histo);

    $("#processingStretching_rep").empty();

    for (let i = 0; i < withoutDupli.length; i++) {
        let max = Math.max(...withoutDupli);
        let min = Math.min(...withoutDupli);
        let calcul = (withoutDupli[i] - min) * ((Math.pow(2, exponent) - 1) / (max - min));
        newArray.push(withoutDupli[i] + ";" + calcul);

        $("#processingStretching_rep").append($("<p>")
            .text(withoutDupli[i] + " => (" + withoutDupli[i] + " - " + min
                + ") * ((2^" + exponent + " - 1)/(" + max + " - " + min + ") = " + calcul));
    };

    $("#processingStretching_rep").append($("<table>").addClass("processingStretching_base"));
    const nbPerLine = Math.sqrt(histo.length);

    for (let i = 0; i < histo.length; i += nbPerLine) {
        $("#processingStretching_rep .processingStretching_base").append($("<tr>").addClass("tableStretching-" + i));
        for (let j = 0; j < nbPerLine; j++) {
            $("#processingStretching_rep .processingStretching_base tr.tableStretching-" + i)
                .append($("<td>").text(histo[i + j]));
        };
    };

    $("#processingStretching_rep")
        .append($("<span>").text("=>").css("vertical-align", "60px"))
        .append($("<table>").addClass("processingStretching"));

    for (let i = 0; i < histo.length; i += nbPerLine) {
        $("#processingStretching_rep .processingStretching").append($("<tr>").addClass("tableStretching-" + i));
        for (let j = 0; j < nbPerLine; j++) {
            $("#processingStretching_rep .processingStretching tr.tableStretching-" + i)
                .append($("<td>").text(replaced(newArray, histo[i + j])));
        };
    };
};

/**
 * Creates a equalized histogram on the given bits.
 */
function processingEqualize() {
    const histo = $("#processingEqualize_values").val().split(";");
    const exponent = $("#processingEqualize_exponent").val();
    let array_count = [];
    let newArray = [];
    let cumulate = 0;

    for (let i = 0; i < histo.length; i++) {
        let count = 0;
        for (let j = 0; j < histo.length; j++) {
            if (histo[j] == histo[i]) {
                count++;
            };
        }
        array_count[histo[i]] = count;
    }

    $("#processingEqualize_rep")
        .empty()
        .append($("<h1>").text("Histogramme cumulé").css("margin", "30px 0 -30px 0"))
        .append($("<table>").addClass("cumul").css("margin-bottom", "50px"))
        .append($("<table>").addClass("tableEqualize").css("margin-bottom", "50px").css("vertical-align", "top"));

    const nbPerLine = Math.sqrt(histo.length);
    for (let i = 0; i < histo.length; i += nbPerLine) {
        $("#processingEqualize_rep .tableEqualize").append($("<tr>").addClass("tableEqualize-" + i));
        for (let j = 0; j < nbPerLine; j++) {
            $("#processingEqualize_rep .tableEqualize tr.tableEqualize-" + i)
                .append($("<td>").text(histo[i + j]));
        };
    };

    $("#processingEqualize_rep")
        .append($("<h1>").text("Egaliser").css("margin-bottom", "-20px"))
        .append($("<p>").addClass("egalize"));

    for (const [key, value] of Object.entries(array_count)) {
        let calcul = ((Math.pow(2, exponent) - 1) * (cumulate + value))
            / (Math.sqrt(histo.length) * Math.sqrt(histo.length));
        newArray.push(key + ";" + calcul);

        $("#processingEqualize_rep .egalize").append($("<p>")
            .text(key + " (" + value + " + " + cumulate + " = " + (cumulate + value)
                + ") => ((2^" + exponent + " - 1) * " + (cumulate + value) + ")/("
                + Math.sqrt(histo.length) + "*" + Math.sqrt(histo.length) + ") = " + calcul));

        cumulate += value;
        $("#processingEqualize_rep .cumul").append($("<tr>")
            .append($("<th>").text(key))
            .append($("<td>").text(cumulate))
        );
    };

    $("#processingEqualize_rep").append($("<table>").addClass("processingEqualize_base"));

    for (let i = 0; i < histo.length; i += nbPerLine) {
        $("#processingEqualize_rep .processingEqualize_base").append($("<tr>").addClass("tableEqualize-" + i));
        for (let j = 0; j < nbPerLine; j++) {
            $("#processingEqualize_rep .processingEqualize_base tr.tableEqualize-" + i).append($("<td>").text(histo[i + j]));
        };
    };

    $("#processingEqualize_rep")
        .append($("<span>").text("=>").css("vertical-align", "60px"))
        .append($("<table>").addClass("processingEqualize"));

    const nbPerLineEgalizer = Math.sqrt(histo.length);

    for (let i = 0; i < histo.length; i += nbPerLineEgalizer) {
        $("#processingEqualize_rep .processingEqualize").append($("<tr>").addClass("tableEqualize-" + i));
        for (let j = 0; j < nbPerLineEgalizer; j++) {
            $("#processingEqualize_rep .processingEqualize tr.tableEqualize-" + i)
                .append($("<td>").text(replaced(newArray, histo[i + j])));
        };
    };
};
