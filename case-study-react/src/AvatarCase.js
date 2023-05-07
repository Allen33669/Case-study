import { Avatar, AvatarGroup, Badge } from '@mui/material';

import Header from "./Header.js";
import "./Body.css";

export default function AvatarCase(){
	return(
		<AvatarGroup max={3}>
		<Badge badgeContent={2} color="primary">
		<Avatar alt="avatar1" src="https://magdeleine.co/wp-content/uploads/2023/02/StockSnap_AWGLQ01U2D-1400x933.jpg" />
		</Badge>
		<Badge badgeContent={5} color="primary" max={3}>
		<Avatar alt="avatar2" src="https://magdeleine.co/wp-content/uploads/2023/01/StockSnap_HGRFPBWTEJ-1400x730.jpg" />
		</Badge>
		<Badge badgeContent={5} color="primary">
		<Avatar alt="avatar3" src="https://magdeleine.co/wp-content/uploads/2023/01/42519372812_d156660b24_o-1400x1049.jpg" />
		</Badge>
		<Avatar alt="avatar4" src="https://magdeleine.co/wp-content/uploads/2022/11/21136603719_84d9c89a87_o-1-1400x934.jpg" />
		<Avatar alt="avatar5" src="https://magdeleine.co/wp-content/uploads/2022/11/52408826656_4c520153a4_o-1400x1050.jpg" />
		</AvatarGroup>
		);
}