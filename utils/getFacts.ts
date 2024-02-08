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