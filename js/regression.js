/**
 * Does the math to generate the linear regression line equation.
 */
function regression() {
    const reg_x = $("#regressionX").val().split(";");
    const reg_y = $("#regressionY").val().split(";");
    let sum = [0, 0, 0, 0, 0]

    $("#regression_rep")
        .empty()
        .append($("<table>").append($("<tr>")
            .append($("<th>").text("Xi"))
            .append($("<th>").text("Yi"))
            .append($("<th>").text("XiYi"))
            .append($("<th>").text("Xi^2"))
            .append($("<th>").text("Yi^2"))
        ));

    for (let i = 0; i < reg_x.length; i++) {
        sum[0] += Number(reg_x[i]);
        sum[1] += Number(reg_y[i]);
        sum[2] += Number(reg_x[i] * reg_y[i]);
        sum[3] += Number(reg_x[i] * reg_x[i]);
        sum[4] += Number(reg_y[i] * reg_y[i]);

        $("#regression_rep table").append($("<tr>")
            .append($("<td>").text(reg_x[i]))
            .append($("<td>").text(reg_y[i]))
            .append($("<td>").text(reg_x[i] * reg_y[i]))
            .append($("<td>").text(Math.pow(reg_x[i], 2)))
            .append($("<td>").text(Math.pow(reg_y[i], 2)))
        );
    }

    $("#regression_rep table").append($("<tr>")
        .append($("<th>").text(sum[0]))
        .append($("<th>").text(sum[1]))
        .append($("<th>").text(sum[2]))
        .append($("<th>").text(sum[3]))
        .append($("<th>").text(sum[4]))
    );

    const muX = 1 / reg_x.length * sum[0];
    const muY = 1 / reg_y.length * sum[1];
    const sigmaXY = 1 / reg_y.length * sum[2] - muY * muX;
    const sigmaX2 = 1 / reg_x.length * sum[3] - (muX * muX);
    const b = sigmaXY / sigmaX2;
    const a = muY - b * muX;

    $("#regression_rep").append($("<p>").addClass("masterBox"));
    $("#regression_rep .masterBox")
        .append($("<p>").text("µx = 1/" + reg_x.length + "*" + sum[0] + " = " + muX))
        .append($("<p>").text("µy = 1/" + reg_y.length + "*" + sum[1] + " = " + muY))
        .append($("<p>").text("σxy = 1/" + reg_y.length + "*" + sum[2] + " - " + muY + "*" + muX + " = " + sigmaXY))
        .append($("<p>").text("σx^2 = 1/" + reg_x.length + "*" + sum[3] + " - " + muX + "^2 = " + sigmaX2))
        .append($("<p>").text("b = " + sigmaXY + " / " + sigmaX2 + " = " + b))
        .append($("<p>").text("a = " + muY + " - " + b + "*" + muX + " = " + a))
        .append($("<p>").css("margin-top", '10px').text("Y = bX + a : Y = " + b + "x + " + a));
}