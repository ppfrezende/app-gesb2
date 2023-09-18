export function cpfMask(cpf: string) {
  if (cpf) {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
}

export function rgMask(rg: string) {
  if (rg) {
    return rg
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4')
  }
}

export function phoneMask(phone: string) {
  if (phone) {
    return phone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
}

export function cnpjMask(cnpj: string) {
  if (cnpj.length !== 11) return

  return cnpj
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export function cepMask(cep: string) {
  if (cep) {
    return cep.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2')
  }
}
