export interface User{
    id?: number,
    profile_id?: number,
    picture?: string,
    description?: string,
    private?: boolean,
    email: string,
    username: string,
    password: string,
    ime?: string,
    prezime?: string,
    telefon?: string,
    datumRodjenja?: string,
    pol?: string
}