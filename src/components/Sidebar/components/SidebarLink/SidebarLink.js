import React, { useState } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Inbox as InboxIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import Dot from "../Dot";

export default function SidebarLink ({
  link,
  icon,
  label,
  children,
  location,
  isSidebarOpened,
  nested,
  type,
}) {
  const classes = useStyles();

  // local
  let [isOpen, setIsOpen] = useState(false);
  let isLinkActive =
    link &&
    (location.pathname === link || location.pathname.indexOf(link) !== -1);

  if (type === "title")
    return (
      <Typography
        className={classNames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened,
        })}
      >
        {label}
      </Typography>
    );

  if (type === "divider") return <Divider className={classes.divider} />;

  if (!children)
    return (
      <ListItem
        button
        component={link && Link}
        to={link}
        className={classes.link}
        classes={{
          root: classNames(classes.linkRoot, {
            [classes.linkActive]: isLinkActive && !nested,
            [classes.linkNested]: nested,
          }),
        }}
        disableRipple
      >
        <ListItemIcon
          className={classNames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {nested ? <Dot color={isLinkActive && "primary"} /> : icon}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classNames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
    );

  return (
    <>
      <ListItem
        button
        component={link && Link}
        onClick={toggleCollapse}
        className={classes.link}
        to={link}
        disableRipple
      >
        <ListItemIcon
          className={classNames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {icon ? icon : <InboxIcon />}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classNames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
      {children && (
        <Collapse
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <List component="div" disablePadding>
            {children.map(childrenLink => (
              <SidebarLink
                key={childrenLink && childrenLink.link}
                location={location}
                isSidebarOpened={isSidebarOpened}
                classes={classes}
                nested
                {...childrenLink}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );

  function toggleCollapse(e) {
    if (isSidebarOpened) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  }
}
