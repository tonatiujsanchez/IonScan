export class Registro {
    public format: string;
    public text: string;
    public type: string;
    public icon: string;
    public created: Date;

    constructor( format: string, text: string ){
        this.format = format;
        this.text = text;
        this.created = new Date();

        this.determinarTypo();
    }
    
    private determinarTypo(){
        const inicioTexto = this.text.substring(0, 4);
        console.log('TIPO', inicioTexto );

        switch (inicioTexto) {
            case 'http':
                this.type = 'http';
                this.icon = 'globe-outline'
                break;
            case 'geo:':
                this.type = 'geo';
                this.icon = 'pin-outline'
                break;
            
            default:
                this.type = 'no reconocido';
                this.icon = 'create-outline'
                break;
        }
        
    }
}

