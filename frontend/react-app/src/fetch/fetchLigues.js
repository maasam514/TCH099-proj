export async function fetchLigues(){
    const response = await fetch('https://tch-099-proj.vercel.app/api/api/ligues');
    if(!response.ok){
        throw new Error('Echec dans la recuperation des ligues');
    }
    return await response.json();
}