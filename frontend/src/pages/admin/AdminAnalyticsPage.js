import AdminAnalyticsPageComponent from "./components/AdminAnalyticsPageComponent";
import { getOrdersForAnalysisApi } from "../../service/orderService";
import socketIOClient from "socket.io-client";
function AdminAnalyticsPage() {
  return (
    <AdminAnalyticsPageComponent
      getOrdersForAnalysisApi={getOrdersForAnalysisApi}
      socketIOClient={socketIOClient}
    />
  );
}

export default AdminAnalyticsPage;
