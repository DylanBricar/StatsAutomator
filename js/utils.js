/**
 * Calculates the factorial of a given number
 * @param {Number} nbr the given number
 */
function fact(nbr) {
    // Use memoization to avoid recalculating factorials
    if (!fact.cache) {
        fact.cache = { 0: 1, 1: 1 };
    }
    
    if (fact.cache[nbr] !== undefined) {
        return fact.cache[nbr];
    }
    
    let f = 1;
    for (let i = 2; i <= nbr; i++) {
        f *= i;
    }
    
    fact.cache[nbr] = f;
    return f;
}

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
 * Searches in the table and change the value if the value is negative (1 - F(x)).
 * @param {Number} value the given number
 */
function changeF(value) {
    return (value < 0) ? 1 - (searchF(-1 * value)) : searchF(value);
};

/**
 * Searches in the table the value for the given F number.
 * @param {Number} value the given number
 */
function searchF(value) {
    value = Number.parseFloat(value).toFixed(2);
    let x = value.slice(0, 3);
    let y = value.slice(3, 4);
    return tab_repartition[x][y];
};

// Cache for all values in the table
let tabValuesCache;

/**
 * Searches the table for the number closest to that given.
 * @param {Number} value the given value
 */
function closer(value) {
    // Initialize cache if needed
    if (!tabValuesCache) {
        tabValuesCache = [];
        $.each(tab_repartition, (key, value) => {
            $.each(tab_repartition[key], (inkey, invalue) => {
                tabValuesCache.push(invalue);
            });
        });
    }

    return tabValuesCache.reduce((prev, curr) => {
        return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
    });
}

// Cache pour le mapping des valeurs aux indices
let valueToIndexCache;

/**
 * Finds the index from the number given in the table.
 * @param {Number} valueDon the given value
 */
function findIndex(valueDon) {
    // Initialisation du cache si nécessaire
    if (!valueToIndexCache) {
        valueToIndexCache = {};
        $.each(tab_repartition, (key, value) => {
            $.each(tab_repartition[key], (inkey, invalue) => {
                valueToIndexCache[invalue] = key + inkey;
            });
        });
    }
    
    // Recherche dans le cache
    return valueToIndexCache[valueDon] || "";
}

function replaced(newArray, value) {
    // Utiliser une approche plus directe pour trouver la valeur
    for (let i = 0; i < newArray.length; i++) {
        const array = newArray[i].split(";");
        if (value == array[0]) {
            return Math.round(array[1]);
        }
    }
    return -1;
}

/**
 * Removes duplicates values in the given array.
 * @param {Number} array the given array
 */
function removeDuplicates(array) {
    return [...new Set(array)];
}

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
