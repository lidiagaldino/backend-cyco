import * as yup from 'yup'
import { TEnterpriseInputDTO } from '../../../../@core/application/dto/input/enterprise.dto.input'

export const enterpriseSchema: yup.SchemaOf<TEnterpriseInputDTO> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  commercialName: yup.string().required(),
  companyName: yup.string().required(),
  document: yup.string().required(),
  phone: yup.object().shape({
    ddd: yup.string().required(),
    ddi: yup.string().required(),
    number: yup.string().required()
  }).required(),
  address: yup.object().shape({
    zipCode: yup.string().required(),
    complement: yup.string().required(),
    number: yup.string().required(),
  }).required()
})
