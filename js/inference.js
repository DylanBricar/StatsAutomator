/**
 * Computes the inferences when we know Sigma.
 */
function inferenceSigmaKnown() {
    let xbar = eval($("#inferenceSigmaKnown_xbar").val());
    let pourcent = Number(eval($("#inferenceSigmaKnown_pourcent").val()));
    pourcent = (pourcent >= 1) ? pourcent / 100 : pourcent;
    let N = eval($("#inferenceSigmaKnown_size").val());
    const sigma = eval($("#inferenceSigmaKnown_sigma").val());
    const error = 100 - (pourcent * 100);
    const Z = findIndex(closer((1 + pourcent) / 2));
    const sigma_x = sigma / Math.sqrt(N);
    $("#inferenceSigmaKnown_rep").empty();

    if (sigma && pourcent && xbar) {
        if (N) {
            $("#inferenceSigmaKnown_rep")
                .append($("<p>").text("Erreur à " + error + "%"))
                .append($("<p>").text("σx̄ = σ/n = " + sigma_x))
                .append($("<p>").text("Z = 2(F) - 1 = " + pourcent + " = " + Z))
                .append($("<p>").text("x ∈ [x̄ - Zσx̄ ; x̄ + Zσx̄] = [" + xbar + " - "
                    + Z + "*" + sigma_x + " ; " + xbar + " + " + Z + "*" + sigma_x + "]"))
                .append($("<p>").text("= [" + (xbar - Z * sigma_x) + " ; " + (xbar + Z * sigma_x) + "]"));
        } else {
            $("#inferenceSigmaKnown_rep")
                .append($("<p>").text("Recherche de la taille de l'échantillon."))
                .append($("<br>"))
                .append($("<p>").text("Erreur à " + error + "%"))
                .append($("<p>").text("Z = 2(F) - 1 = " + pourcent + " = " + Z));

            N = Math.pow((2 * Z * sigma) / (2 * xbar), 2);
            $("#inferenceSigmaKnown_rep")
                .append($("<p>").text("N = [(2 * Z * σ)/2*x̄]^2 = [(2 * " + Z + " * " + sigma + ") / (2*" + xbar + ")]^2 = " + N));
        };
    } else {
        $("#inferenceSigmaKnown_rep").append($("<p>").text("Merci de remplir tous les champs."))
    };
};

/**
 * Computes the inferences when we unknow Sigma and the size is big.
 */
function inferenceSigmaUnKnownLarge() {
    let pourcent = Number(eval($("#inferenceSigmaUnKnownLarge_pourcent").val()));
    pourcent = (pourcent >= 1) ? pourcent / 100 : pourcent;
    let N = eval($("#inferenceSigmaUnKnownLarge_size").val());
    const xbar = eval($("#inferenceSigmaUnKnownLarge_xbar").val());
    const S = eval($("#inferenceSigmaUnKnownLarge_s").val());
    const selectedChoose = $("#inferenceSigmaUnKnownLarge_select").children("option:selected").val();
    const error = 100 - (pourcent * 100);
    const Z = findIndex(closer((1 + pourcent) / 2));
    const Sp = (selectedChoose === "Sp") ? S : Math.sqrt((N / (N - 1))) * S;
    const sigma_x = Sp / Math.sqrt(N);
    $("#inferenceSigmaUnKnownLarge_rep").empty();

    if (xbar && selectedChoose && S && pourcent && N) {
        $("#inferenceSigmaUnKnownLarge_rep")
            .append($("<p>").text("Erreur à " + error + "%"))
            .append($("<p>").text("σx̄ = σ/n = " + sigma_x))
            .append($("<p>").text("Z = 2(F) - 1 = " + pourcent + " = " + Z))
            .append($("<p>").text("x ∈ [x̄ - Zσx̄ ; x̄ + Zσx̄] = [" + xbar + " - "
                + Z + "*" + sigma_x + " ; " + xbar + " + " + Z + "*" + sigma_x + "]"))
            .append($("<p>").text("= [" + (xbar - Z * sigma_x) + " ; " + (xbar + Z * sigma_x) + "]"))
    } else {
        $("#inferenceSigmaUnKnownLarge_rep")
            .append($("<p>").text("Merci de remplir tous les champs."))
    };
};

/**
 * Computes the inferences when we unknow Sigma and the size is little.
 */
function inferenceSigmaUnKnownLittle() {
    let xbar = eval($("#inferenceSigmaUnKnownLittle_xbar").val());
    let pourcent = Number(eval($("#inferenceSigmaUnKnownLittle_pourcent").val()));
    pourcent = (pourcent >= 1) ? pourcent / 100 : pourcent;
    const N = eval($("#inferenceSigmaUnKnownLittle_size").val());
    const selectedChoose = $("#inferenceSigmaUnKnownLittle_select").children("option:selected").val();
    const S = eval($("#inferenceSigmaUnKnownLittle_s").val());
    const error = 100 - (pourcent * 100);
    const errorToSearch = (error / 2) / 100;
    const Sp = (selectedChoose === "Sp") ? S : Math.sqrt((N / (N - 1))) * S;
    const sigma_x = Sp / Math.sqrt(N);

    let level = -1;
    switch (errorToSearch) {
        case 0.10:
            level = 0;
            break;
        case 0.05:
            level = 1;
            break;
        case 0.025:
            level = 2;
            break;
        case 0.01:
            level = 3;
            break;
        case 0.005:
            level = 4;
            break;
    }

    const T = tab_student[N - 1][level];
    $("#inferenceSigmaUnKnownLittle_rep").empty();

    if (xbar && selectedChoose && S && pourcent && N) {
        $("#inferenceSigmaUnKnownLittle_rep")
            .append($("<p>").text("Erreur à " + error + "%"))
            .append($("<p>").text("Dans la table Student : degré de liberté de n - 1 ("
                + (N - 1) + ") et pourcentage d'erreur / 2 ( " + errorToSearch / 100 + " ) : T = " + T))
            .append($("<p>").text("S' = " + Sp))
            .append($("<p>").text("σx̄ = σ/n = " + sigma_x))
            .append($("<p>").text("IC = [x̄ - Tσx̄ ; x̄ + Tσx̄] = [" + xbar + " - "
                + T + "*" + sigma_x + " ; " + xbar + " + " + T + "*" + sigma_x + "]"))
            .append($("<p>").text("= [" + (xbar - T * sigma_x) + " ; " + (xbar + T * sigma_x) + "]"));
    } else {
        $("#inferenceSigmaUnKnownLittle_rep")
            .append($("<p>").text("Merci de remplir tous les champs."))
    };
};

