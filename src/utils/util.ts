//import moment from 'moment';
import { format, formatDate } from 'date-fns/format';
import { ptBR } from 'date-fns/locale/pt-BR';

export function dataHoraZone() {
  const datahora = new Date();
  const dataFormatada = format(datahora, "dd/MM/yyyy");
  return dataFormatada;
};

export function cnpjFormat(valor: string) {
  if (!valor) return;

  valor = valor.replace(/\D+/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');

  return valor;
};

export function cepFormat(valor: string) {
  if (!valor) return;

  valor = valor.replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');

  return valor;
}

export function telefoneFormat(valor: string) {
  if (!valor) return;

  valor = valor.replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2");

  return valor;
};

export function FormatDateBR(date: Date) {
  const dt = format(date, 'dd/MM/yyyy', { locale: ptBR });

  return dt;
}

export function getUF() {
  const opcoesUfs = [
    { value: 0, label: 'Selecione um Estado' },
    { value: 1, label: 'AC - ACRE' },
    { value: 2, label: 'AL - ALAGOAS' },
    { value: 3, label: 'AM - AMAZONAS' },
    { value: 4, label: 'AP - AMAPÁ' },
    { value: 5, label: 'BA - BAHIA' },
    { value: 6, label: 'CE - CEARÁ' },
    { value: 7, label: 'DF - DISTRITO FEDERAL' },
    { value: 8, label: 'ES - ESPÍRITO SANTO' },
    { value: 9, label: 'EX - EXTERIOR' },
    { value: 10, label: 'GO - GOIÁS' },
    { value: 11, label: 'MA - MARANHÃO' },
    { value: 12, label: 'MG - MINAS GERAIS' },
    { value: 13, label: 'MS - MATO GROSSO DO SUL' },
    { value: 14, label: 'MT - MATO GROSSO' },
    { value: 15, label: 'PA - PARÁ' },
    { value: 16, label: 'PB - PARAÍBA' },
    { value: 17, label: 'PE - PERNAMBUCO' },
    { value: 18, label: 'PI - PIAUÍ' },
    { value: 19, label: 'PR - PARANÁ' },
    { value: 20, label: 'RJ - RIO DE JANEIRO' },
    { value: 21, label: 'RN - RIO GRANDE DO NORTE' },
    { value: 22, label: 'RS - RIO GRANDE DO SUL' },
    { value: 23, label: 'RO - RONDÔNIA' },
    { value: 24, label: 'RR - RORAIMA' },
    { value: 25, label: 'SC - SANTA CATARINA' },
    { value: 26, label: 'SP - SÃO PAULO' },
    { value: 27, label: 'SE - SERGIPE' },
    { value: 28, label: 'TO - TOCANTINS' },
  ];

  return opcoesUfs;
};

