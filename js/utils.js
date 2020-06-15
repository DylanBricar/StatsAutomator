/**
 * Calculates the factorial of a given number
 * @param {Number} nbr the given number
 */
function fact(nbr) {
    var i, nbr, f = 1;
    for (i = 1; i <= nbr; i++) {
        f *= i;
    };
    return f;
};

/**
 * Calculates the probability in the binomial law.
 * @param {Number} N The given N number
 * @param {Number} P The given P number
 * @param {Number} K The given K number
 * @param {Number} Q The given Q number
 */
function bino_proba(N, P, K, Q) {
    return (fact(N) / (fact(K) * fact(N - K))) * Math.pow(P, K) * Math.pow(Q, (N - K));
};

/**
 * Searchs in the table and change the value if the value is negative (1 - F(x)).
 * @param {Number} value the given number
 */
function changeF(value) {
    return (value < 0) ? 1 - (searchF(-1 * value)) : searchF(value);
};

/**
 * Searchs in the table the value for the given F number.
 * @param {Number} value the given number
 */
function searchF(value) {
    value = Number.parseFloat(value).toFixed(2);
    let x = value.slice(0, 3);
    let y = value.slice(3, 4);
    return tab_repartition[x][y];
};

/**
 * Searchs the table for the number closest to that given.
 * @param {Number} value the given value
 */
function closer(value) {
    let array = [];

    $.each(tab_repartition, (key, value) => {
        $.each(tab_repartition[key], (inkey, invalue) => {
            array.push(invalue)
        });
    });

    let closest = array.reduce((prev, curr) => {
        return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
    });

    return closest;
};

/**
 * Finds the index from the number given in the table.
 * @param {Number} valueDon the given value
 */
function findIndex(valueDon) {
    let index = 0;
    $.each(tab_repartition, (key, value) => {
        $.each(tab_repartition[key], (inkey, invalue) => {
            if (invalue === valueDon) {
                index = key + inkey;
            };
        });
    });
    return index;
};

function replaced(newArray, value) {
    let valeur = -1;
    let i = 0;

    while (valeur == -1 || i < newArray.length) {
        array = newArray[i].split(";");
        if (value == array[0]) {
            valeur = array[1];
        }
        i++;
    };
    return Math.round(valeur);
};

/**
 * Removes duplicates values in the given array.
 * @param {Number} array the given array
 */
function removeDuplicates(array) {
    let unique = {};
    array.forEach((i) => {
        if (!unique[i]) {
            unique[i] = true;
        };
    });
    return Object.keys(unique);
};

/**
 * Makes an object with the string of all probabilitues and calculs them.
 * @param {Number} K The K value for the binomial law
 * @param {Number} N The N value for the binomial law
 * @param {Number} P The P value for the binomial law
 * @param {Number} Q The Q value for the binomial law
 */
function addProbability(K, N, P, Q) {
    let object = new Object();
    object.string = "";
    object.value = 0;

    for (let i = 0; i <= K; i++) {
        object.string += "P[x = " + i + "]";
        if (i != K) {
            object.string += " + ";
        };
        object.value += Number(bino_proba(N, P, i, Q));
    };
    return object;
};

/**
 * Validates the form when it is clicked or pressed Enter and executes the given function.
 * @param {String} selector the selector of formular
 * @param {Function} func the given function to executate
 */
function exec(selector, func) {
    $("#" + selector).click(() => func());
    $("." + selector).keyup((event) => (event.keyCode === 13) ? func() : false);
};

/**
 * Removes the liability alert for this website.
 */
function removeIntro() {
    if (localStorage.getItem('Intro')) {
        $(".separator.intro").remove();
        localStorage.setItem('Intro', 'Accepted');
    } else {
        $("#removeIntro").click(() => {
            $(".separator.intro").remove();
            localStorage.setItem('Intro', 'Accepted');
        });
    };
};
