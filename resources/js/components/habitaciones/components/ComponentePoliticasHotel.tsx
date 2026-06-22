import { Ban, CalendarDays, Clock3, CreditCard, DoorOpen, Info, UsersRound } from "lucide-react";
import type { HabitacionesPageText, HotelInfo } from "../interfaces";
import ComponentePoliticas from "./ComponentePoliticas";
import TablaPoliticaCancelacion from "./TablaPoliticaCancelacion";

interface ComponentePoliticasHotelInterface {
  info: HotelInfo;
  text: HabitacionesPageText;
}

function funcionDividirTexto(text: string) {
  return text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
}

const FilaPoliticas = ({ text }: { text: string }) => {
  const rows = funcionDividirTexto(text);

  return (
    <div className="habitacion-policy-text-rows">
      {rows.map((row, index) => (
        <p key={`${row}-${index}`}>{row}</p>
      ))}
    </div>
  );
}

export default function ComponentePoliticasHotel({info, text}: ComponentePoliticasHotelInterface) {
  return (
    <section className="habitacion-policy-board" aria-labelledby="habitacion-policy-board-title">
      <div className="habitacion-policy-board-heading">
        <h3 id="habitacion-policy-board-title">
          {text.policies_title}
        </h3>
        <span>{text.policies_subtitle}</span>
      </div>

      <div className="habitacion-policy-grid">
        <ComponentePoliticas title={text.schedule_policy_title} icon={Clock3}>
            <div className="habitacion-policy-time-list">
              <div>
                <DoorOpen size={20} />
                <span>{text.check_in_label}</span>
                <strong>{info.checkIn}</strong>
              </div>
              <div>
                <DoorOpen size={20} />
                <span>{text.check_out_label}</span>
                <strong>{info.checkOut}</strong>
              </div>
            </div>
        </ComponentePoliticas>

        <ComponentePoliticas title={text.payment_policy_title} icon={CreditCard} tone="gold">
          <FilaPoliticas text={info.paymentPolicy} />
        </ComponentePoliticas>

        <ComponentePoliticas title={text.cancellation_policy_title} icon={CalendarDays} className="habitacion-policy-card-wide">
          <FilaPoliticas text={info.cancellationPolicy.description}/>

          <TablaPoliticaCancelacion policy={info.cancellationPolicy} text={text}/>

          <div className="habitacion-policy-note">
            <Info size={18} />
            <FilaPoliticas text={info.cancellationPolicy.description_end}/>
          </div>
        </ComponentePoliticas>

        <ComponentePoliticas title={text.no_show_policy_title} icon={Ban} tone="coral">
          <FilaPoliticas text={info.noShowPolicy} />
        </ComponentePoliticas>

        <ComponentePoliticas title={text.extra_guest_policy_title} icon={UsersRound} tone="blue">
          <FilaPoliticas text={info.extraGuestPolicy} />
        </ComponentePoliticas>
      </div>
    </section>
  );
}