/**
 * Searches in the table the value for the normal law.
 */
function normalSearch() {
    const value = eval($("#normalSearch_value").val());
    $("#normalSearch_rep")
        .empty()
        .append($("<p>").text("F(" + value + ") = " + changeF(value)));
}

/**
 * Searches in the table the closer value for the normal law.
 */
function normalCloser() {
    const value = eval($("#normalCloser_value").val());
    $("#normalCloser_rep")
        .empty()
        .append($("<p>").text("La valeur la plus proche de " + value + " est "
            + closer(value) + " et se trouve à la position " + findIndex(closer(value))));
}

/**
 * Searches the normal law in a simple interval.
 */
function normalSimpleInterval() {
    const selectedChoose = $("#normalSimpleInterval_select").children("option:selected").val();
    const mu = $("#normalSimpleInterval_mu").val();
    const sigma = $("#normalSimpleInterval_sigma").val();
    const value = $("#normalSimpleInterval_probability").val();
    $("#normalSimpleInterval_rep").empty();

    if (selectedChoose && value) {
        if (sigma || mu) {

            // Calculs with < and <= symbolcs
            if (selectedChoose === "<" || selectedChoose === "<=") {
                $("#normalSimpleInterval_rep").append($("<p>")
                    .text("P[X " + selectedChoose + " " + value + "] = P[(x - " + mu + ") / " + sigma + " " + selectedChoose + " (" + value + " - " + mu + ") / " + sigma + "] = P[Z " + selectedChoose + " " + (value - mu) / sigma + "]")
                );

                try {
                    $("#normalSimpleInterval_rep")
                        .append($("<p>").text("F(" + (value - mu) / sigma + ") = " + changeF((value - mu) / sigma)));
                } catch {
                    $("#normalSimpleInterval_rep")
                        .append($("<p>").text("F(" + (value - mu) / sigma + ") n'a pas pu être calculé automatiquement."));
                }
                ;

                // Calculs with > and >= symbolcs
            } else if (selectedChoose === ">" || selectedChoose === ">=") {
                $("#normalSimpleInterval_rep").append($("<p>")
                    .text("P[X " + selectedChoose + " " + value + "] = 1 - P[(x - " + mu + ") / " + sigma + " " + selectedChoose + " (" + value + " - " + mu + ") / " + sigma + "] = 1 - P[Z " + selectedChoose + " " + (value - mu) / sigma + "]")
                );

                try {
                    $("#normalSimpleInterval_rep")
                        .append($("<p>").text("1 - F(" + (value - mu) / sigma + ") = 1 - " + changeF((value - mu) / sigma) + " = " + (1 - changeF((value - mu) / sigma))));
                } catch {
                    $("#normalSimpleInterval_rep")
                        .append($("<p>").text("1 - F(" + (value - mu) / sigma + ") n'a pas pu être calculé automatiquement."));
                }
                ;
            }
            ;
        } else {
            $("#normalSimpleInterval_rep")
                .append($("<p>").text("µ et σ n'étant pas remplis, le simple calcul est effectué."))
                .append($("<br>"));

            // Calculs with < and <= symbolcs
            if (selectedChoose === "<" || selectedChoose === "<=") {
                try {
                    $("#normalSimpleInterval_rep")
                        .append($("<p>").text("F(" + value + ") = " + changeF((value))));
                } catch {
                    $("#normalSimpleInterval_rep")
                        .append($("<p>").text("F(" + value + ") n'a pas pu être calculé automatiquement."));
                }
                ;
            } else {
                try {
                    $("#normalSimpleInterval_rep")
                        .append($("<p>").text("1 - F(" + value + ") = 1 - " + changeF(value) + " = " + (1 - changeF((value)))));
                } catch {
                    $("#normalSimpleInterval_rep")
                        .append($("<p>").text("1 - F(" + value + ") n'a pas pu être calculé automatiquement."));
                }
            }
        }
    } else {
        $("#normalSimpleInterval_rep").append($("<p>").text("Merci de remplir tous les champs."));
    }
}

/**
 * Searches the normal law in a double interval.
 */
function normalDoubleInterval() {
    const selectedChoose = $("#normalDoubleInterval_select").children("option:selected").val();
    const mu = $("#normalDoubleInterval_mu").val();
    const sigma = $("#normalDoubleInterval_sigma").val();
    const proba1 = eval($("#normalDoubleInterval_probability_1").val());
    const proba2 = eval($("#normalDoubleInterval_probability_2").val());
    const proba1_cal = (proba1 - mu) / sigma;
    const proba2_cal = (proba2 - mu) / sigma;
    $("#normalDoubleInterval_rep").empty();

    if (selectedChoose && proba1 && proba2) {
        if (sigma || mu) {

            // Calculs with < and <= symbolcs
            if (selectedChoose === "<" || selectedChoose === "<=") {
                $("#normalDoubleInterval_rep").append($("<p>")
                    .text("P[(" + proba1 + " - " + mu + ") / " + sigma + " " + selectedChoose + " X " + selectedChoose
                        + "(" + proba2 + " - " + mu + ") / " + sigma + "] = P[" + proba1_cal + " " + selectedChoose
                        + "  X " + selectedChoose + " " + proba2_cal + "]"))
                    .append($("<p>").text("F(" + proba2_cal + ") - F(" + proba1_cal + ") = "
                        + changeF(proba2_cal) + " - " + changeF(proba1_cal) + " = " + (changeF(proba2_cal) - changeF(proba1_cal))));
            } else {
                $("#normalDoubleInterval_rep").append($("<p>")
                    .text("1 - P[(" + proba1 + " - " + mu + ") / " + sigma + " " + selectedChoose + " X " + selectedChoose
                        + "(" + proba2 + " - " + mu + ") / " + sigma + "] = 1 - P[" + proba1_cal + " " + selectedChoose
                        + "  X " + selectedChoose + " " + proba2_cal + "]"))
                    .append($("<p>").text("1 - [F(" + proba2_cal + ") - F(" + proba1_cal + ")] = 1 - ("
                        + changeF(proba2_cal) + " - " + changeF(proba1_cal) + ") = " + (1 - (changeF(proba2_cal) - changeF(proba1_cal)))));
            }
        } else {
            $("#normalDoubleInterval_rep")
                .append($("<p>").text("µ et σ n'étant pas remplis, le simple calcul est effectué."))
                .append($("<br>"));

            // Calculs with < and <= symbolcs
            if (selectedChoose === "<" || selectedChoose === "<=") {
                try {
                    $("#normalDoubleInterval_rep").append($("<p>")
                        .text("F(" + proba2 + ") - F(" + proba1 + ") = " + (changeF(proba2) - changeF(proba1))));
                } catch {
                    $("#normalDoubleInterval_rep").append($("<p>")
                        .text("F(" + proba2 + ") - F(" + proba1 + ") n'a pas pu être calculé automatiquement."));
                }
            } else {
                try {
                    $("#normalDoubleInterval_rep").append($("<p>")
                        .text("1 - (F(" + proba2 + ") - F(" + proba1 + ")) = " + (1 - (changeF(proba2) - changeF(proba1)))));
                } catch {
                    $("#normalDoubleInterval_rep").append($("<p>")
                        .text("1 - (F(" + proba2 + ") - F(" + proba1 + ")) n'a pas pu être calculé automatiquement."));
                }
            }
        }
    } else {
        $("#normalDoubleInterval_rep").append($("<p>").text("Merci de remplir tous les champs."));
    }
}

/**
 * Calculs the normal law when mu is unknown.
 */
function normalSpecial() {
    const mu = $("#normalSpecial_mu").val() === "" ? "µ" : eval($("#normalSpecial_mu").val());
    const sigma = $("#normalSpecial_sigma").val() === "" ? "σ" : eval($("#normalSpecial_sigma").val());
    const ope = $("#normalSpecial_select").children("option:selected").val();
    const value = eval($("#normalSpecial_value").val());
    let prop = eval($("#normalSpecial_probability").val());

    $("#normalSpecial_rep").empty();

    if (ope) {
        $("#normalSpecial_rep")
            .append($("<p>").text("X ∼ N (" + mu + " ; " + sigma + ")"))
            .append($("<p>").text("P(X " + ope + " " + value + ") = " + prop));

        if (ope.indexOf("<")) {
            $("#normalSpecial_rep").append($("<p>").text("P(X < " + value + ") = 1 - " + prop + " = " + (1 - prop)));
            prop = 1 - prop;
        }

        const index = findIndex(closer(prop));
        $("#normalSpecial_rep")
            .append($("<p>")
                .text("P(Z " + ope + " (" + value + " - " + mu + ") / " + sigma + ") = " + index + " (voir table normale)."))
            .append($("<p>")
                .text("Donc µ = " + value + " − " + sigma + " * " + index + " = " + (value - sigma * index) + " (tronquer si nécéssaire)."));
    } else {
        $("#normalSpecial_rep").append($("<p>").text("Merci de choisir l'opérateur."));
    }
}
