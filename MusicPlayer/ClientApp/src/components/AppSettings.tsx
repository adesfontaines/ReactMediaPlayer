import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid, Link } from "@material-ui/core"
import { SiBbciplayer as PlayerIcon } from "react-icons/si"
import { IconType } from 'react-icons/lib';
function AppSettings() {

  interface SettingEntity
  {
    label: string;
    navigationLink: string;
    icon: IconType;
  }
  const settings: SettingEntity[] = [
    { label: "Player", icon: PlayerIcon, navigationLink: "/player" },
    { label: "Server", icon: PlayerIcon, navigationLink: "/server" },
    { label: "Display", icon: PlayerIcon, navigationLink: "/display" },
    { label: "Misc", icon: PlayerIcon, navigationLink: "/misc" },
  ];
  const renderSettings = () => {
    return settings.map((setting: SettingEntity) => (
      <Grid item>
        <Card style={{width: '128px', height: '128px' }}>
          <CardActionArea>
            <CardContent>
              {setting.icon.toString()}
              <Typography>
                <Link href={`./settings/${setting.navigationLink}`} color="textSecondary">{setting.label}</Link>
            </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ));
  }
  return (
    <div>
      <h1>Settings</h1>
      <Grid container spacing={3}>
        {renderSettings()}
      </Grid>
    </div>
  )
}

export default connect()(AppSettings as any);
