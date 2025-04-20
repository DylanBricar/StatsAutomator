/**
 * Calculates a probability with two values in binomial distribution and displays the results.
 */
function binoTwoValue() {
    const selectedChoose = $("#binoTwoValue_select").children("option:selected").val();

    if (selectedChoose) {
        const N = $("#binoTwoValue_tentative").val();
        const P = eval($("#binoTwoValue_probability").val());
        const Q = 1 - P;
        const returned = (selectedChoose === "P") ? P : Q;

        $("#binoTwoValue_rep")
            .empty()
            .append($("<p>").text("μ : E(x) = N*" + selectedChoose + " = " + N + "*" + selectedChoose + " = " + N * returned))
            .append($("<p>").text("σ^2 : N*P*Q = " + N + "*" + P + "*" + Q + " = " + N * P * Q))
            .append($("<p>").text("σ : √N*P*Q = √" + N + "*" + P + "*" + Q + " = " + Math.sqrt(N * P * Q)));
    } else {
        $("#binoTwoValue_rep")
            .empty()
            .append($("<p>").text("Merci de choisir P ou Q comme résultat cherché."));
    }
}

/**
 * Calculates a probability with a binomial distribution and displays the results.
 */
function binoProbability() {
    const selectedChoose = $("#binoProbability_select").children("option:selected").val();
    const N = eval($("#binoProbability_tentative").val());
    const P = eval($("#binoProbability_success").val());
    const Q = 1 - P;
    const K = eval($("#binoProbability_probability").val());

    let probabilities;
    if (N && P && K && selectedChoose) {
        $("#binoProbability_rep").empty();

        // Select with the " = " operator
        if (selectedChoose === "=") {
            $("#binoProbability_rep")
                .append($("<p>").text("X ~ B (" + N + ", " + P + ") où P[X = " + K + "] :"))
                .append($("<p>").text("P[X = k] = (n! / k! (n-k)!) * p^k * q^(n-k)"))
                .append($("<p>").text("P[X = " + K + "] = ("
                    + fact(N) + " / (" + fact(K) + " * " + fact(N - K) + ")) * " + P + "^" + K + " * " + Q + "^" + (N - K)))
                .append($("<p>").text("P[X = " + K + "] = " + bino_proba(N, P, K, Q)));

            // Select with the " >= " operator
        } else if (selectedChoose === ">=") {
            $("#binoProbability_rep")
                .append($("<p>").text("X ~ B (" + N + ", " + P + ") où P[X >= " + K + "] :"))
                .append($("<p>").text("P[X >= k] = 1 - (∑ P[x = (i < k)]"));

            probabilities = addProbability(K, N, P, Q);
            $("#binoProbability_rep").append($("<p>").text("P[X >= " + K + "] = 1 - ("
                + probabilities.string + ") = 1 - " + probabilities.value + " = " + (1 - probabilities.value)));

            // Select with the " > " operator
        } else if (selectedChoose === ">") {
            $("#binoProbability_rep")
                .append($("<p>").text("X ~ B (" + N + ", " + P + ") où P[X > " + K + "] :"))
                .append($("<p>").text("P[X > k] = 1 - (∑ P[x = (i <= k)]"));

            probabilities = addProbability(K, N, P, Q);
            $("#binoProbability_rep").append($("<p>").text("P[X > " + K + "] = 1 - ("
                + probabilities.string + ") = 1 - " + probabilities.value + " = " + (1 - probabilities.value)));

            // Select with the " < " operator
        } else if (selectedChoose === "<") {
            $("#binoProbability_rep")
                .append($("<p>").text("X ~ B (" + N + ", " + P + ") où P[X < " + K + "] :"))
                .append($("<p>").text("P[X < k] = ∑ P[x = (i < k)]"));

            probabilities = addProbability(K, N, P, Q);
            $("#binoProbability_rep").append($("<p>").text("P[X < " + K + "] = " + probabilities.string + " = " + probabilities.value));

            // Select with the " <= " operator
        } else if (selectedChoose === "<=") {
            $("#binoProbability_rep")
                .append($("<p>").text("X ~ B (" + N + ", " + P + ") où P[X <= " + K + "] :"))
                .append($("<p>").text("P[X <= k] = ∑ P[x = (i < k)]"));

            probabilities = addProbability(K, N, P, Q);
            $("#binoProbability_rep").append($("<p>").text("P[X <= " + K + "] = " + probabilities.string + " = " + probabilities.value));
        }

        $("#binoProbability_rep")
            .append($("<p>").css('margin-top', '12px').text("μ : E(x) = N*P = " + N + "*" + P + " = " + N * P))
            .append($("<p>").text("σ^2 : N*P*Q = " + N + "*" + P + "*" + Q + " = " + N * P * Q))
            .append($("<p>").text("σ : √N*P*Q = √" + N + "*" + P + "*" + Q + " = " + Math.sqrt(N * P * Q)));
    } else {
        $("#binoProbability_rep")
            .empty()
            .append($("<p>").text("Merci de remplir tous les champs."));
    }
}
