export namespace TranslateEnum {
    export function gender(value:string):string {
        switch(value) {
            case 'FEMALE': return 'Feminino';
            case 'MALE': return 'Masculino';
            default: return '-';
        }
    }

    export function maritalStatus(value:string):string {
        switch(value) {
            case 'SINGLE': return 'Solteiro(a)';
            case 'GROOM': return 'Noivo(a)';
            case 'MARRIED': return 'Casado(a)';
            case 'STABLEUNION': return 'União estável';
            case 'WIDOWER': return 'Viúvo(a)';
            case 'DIVORCED': return 'Divorciado(a)';
            default: return '-';
        }
    }

    export function address(address:any):string {
        if (address && address?.zipCode) {
          return address?.publicPlace + ', ' + address?.number + ' - ' + address?.city + '/' + address?.state;
        }
        return '-';
    }

    export function church(value:string):string {
        switch(value) {
            case 'MARINGA': return 'Maringá';
            case 'MANDAGUACU': return 'Mandaguaçu';
            case 'CAMPINA': return 'Campina da Lagoa';
            default: return '-';
        }
    }

    export function characteristic(value:string):string {
        switch(value) {
            case 'MEMBRO': return 'Sou membro da igreja';
            case 'QUER_SER_MEMBRO': return 'Estou no caminho para virar membro';
            case 'VISITANTE': return 'Visito a igreja';
            case 'DESEJA_VISITAR': return 'Nunca visitei, mas tenho vontade';
            default: return '-';
        }
    }
    
    export function getBoolean(value:boolean):string {
        switch(value) {
            case true: return 'Sim';
            case false: return 'Não';
            default: return '-';
        }
    }

    export function getValue(value:any):any {
        return value ? value : '-';
    }

    export function entranceToThechurchList(value:string):string {
        switch(value) {
            case 'BATISMO': return 'Batismo: fui batizado(a) na igreja';
            case 'TRANSFERENCIA': return 'Transferência: me transferi de uma igreja de outra denominação';
            case 'RECONCILIACAO': return 'Reconciliação: estava afastado e voltei para a igreja';
            case 'JURISDICAO': return 'Jurisdição: vim de outra igreja da mesma denominação';
            case 'ACLAMACAO': return 'Aclamação: fui batizado(a) em outra igreja';
            default: return '-';
        }
    }
}