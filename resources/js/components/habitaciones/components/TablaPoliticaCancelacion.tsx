import type { HabitacionesPageText, HotelCancellationPolicy } from "../interfaces";

interface TablaPoliticaCancelacionInterface {
  policy: HotelCancellationPolicy;
  text: HabitacionesPageText;
}

export default function TablaPoliticaCancelacion({policy, text}: TablaPoliticaCancelacionInterface) {
  return (
    <div className="habitacion-cancellation-table-wrap">
      <table className="habitacion-cancellation-table">
        <thead>
          <tr>
            <th scope="col">{text.arrival_weeks_label}</th>
            <th scope="col">{text.refund_label}</th>
            <th scope="col">{text.credit_label}</th>
          </tr>
        </thead>
        <tbody>
          {policy.rows.map((row) => (
            <tr key={row.weeksBeforeArrival}>
              <th scope="row">{row.weeksBeforeArrival}</th>
              <td>{row.refund}</td>
              <td>{row.credit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
