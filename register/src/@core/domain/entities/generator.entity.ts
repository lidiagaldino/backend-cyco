import { Guard } from "../shared/guard/guard"
import { Result } from "../shared/result/result"

export type TGenerator = {
    name: string,
    username: string, // create username value object
    password: string, //create password value object
    photo: string, //create url value object
    birth_date: Date,
    document: string, //create document value object (cpf or cnpj)
    phone: string, //create phone value object
    address: string //create address value object
}

export class Generator {
    private id: number
    private props: TGenerator

    private constructor(props: TGenerator) {
        this.props = props
    }

    public static create(generator: TGenerator) {
        const guardResults = Guard.combine([
            Guard.againstNullOrUndefined(generator.name, 'name'),
            Guard.againstNullOrUndefined(generator.username, 'username'),
            Guard.againstNullOrUndefined(generator.password, 'password'),
            Guard.againstNullOrUndefined(generator.photo, 'photo'),
            Guard.againstNullOrUndefined(generator.birth_date, 'birth_date'),
            Guard.againstNullOrUndefined(generator.document, 'document'),
            Guard.againstNullOrUndefined(generator.phone, 'phone'),
            Guard.againstNullOrUndefined(generator.address, 'address'),
        ])

        if (guardResults.isFailure) {
            return Result.fail<Generator>(guardResults.getErrorValue());
          }
      
        return Result.ok<Generator>(new Generator(generator));
    }

    public getId(){
        return this.id
    }

    public getName(){
        return this.props.name
    }

    public getUsername(){
        return this.props.username
    }

    public getPassword(){
        return this.props.password
    }

    public getPhoto(){
        return this.props.photo
    }

    public getBirthdate(){
        return this.props.birth_date
    }

    public getDocument(){
        return this.props.document
    }

    public getPhone(){
        return this.props.phone
    }

    public getAddress(){
        return this.props.address
    }

    public setId(id: number){
        this.id = id
    }

    public setName(name :string){
        this.props.name = name
    }

    public setUsername(username: string){
        this.props.username = username
    }

    public setPassword(password: string){
        this.props.password = password
    }

    public setPhoto(photo: string){
        this.props.photo = photo
    }

    public setBirthdate(birth_date: Date){
        this.props.birth_date = birth_date
    }

    public setDocument(document: string){
        this.props.document = document
    }

    public setPhone(phone: string){
        this.props.phone = phone
    }

    public setAddress(address: string){
        this.props.address = address
    }
}