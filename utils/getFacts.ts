/**
 * Formats an array of facts by converting the 'created' and 'updated' properties to Date objects.
 * @param {Fact[]} facts - The array of facts to be formatted.
 * @returns {Fact[]} - The formatted array of facts.
 */
export default async function getFacts(facts) {
    if (!facts) return [];
    let formattedFacts = [];
    for (let fact of facts) {
        let formattedFact = {
            created: new Date(fact.created),
            id: fact.id,
            updated: new Date(fact.updated),
            fact: fact.fact,
        }
        formattedFacts.push(formattedFact);
    }
    return formattedFacts;
}