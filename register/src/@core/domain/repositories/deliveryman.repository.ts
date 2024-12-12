import { Deliveryman } from "../entities/deliveryman.entity";

export interface IDeliverymanRepository {
  create(deliveryman: Deliveryman): Promise<Deliveryman>
}