import React, { useState } from "react";
import { FaShare } from "react-icons/fa";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";

interface ShareButtonProps {
  title: string;
  imageUrl: string;
  postUrl: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  imageUrl,
  postUrl,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const popoverId = isOpen ? "share-popover" : undefined;

  const shareContent = {
    title,
    url: postUrl,
    image: imageUrl,
  };

  return (
    <div>
      {/* Share Button */}

      <button
        className="lg:flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-all duration-200 hidden  "
        onClick={handleClick}
        aria-describedby={popoverId}
      >
        <FaShare className="text-xl" />
        <span className="text-sm">Share</span>
      </button>

      {/* Popover */}
      <Popover
        id={popoverId}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 2, width: 200 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", marginBottom: 1 }}
          >
            Share on
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <FacebookShareButton
              url={shareContent.url}
              //   quote={shareContent.title}
              hashtag="#eyebook"
              htmlTitle={shareContent.title}
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ cursor: "pointer" }}
              >
                <FacebookIcon color="primary" />
                <Typography>Facebook</Typography>
              </Box>
            </FacebookShareButton>

            <TwitterShareButton
              url={shareContent.url}
              title={shareContent.title}
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ cursor: "pointer" }}
              >
                <TwitterIcon sx={{ color: "#1DA1F2" }} />
                <Typography>Twitter</Typography>
              </Box>
            </TwitterShareButton>

            <LinkedinShareButton
              url={shareContent.url}
              title={shareContent.title}
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ cursor: "pointer" }}
              >
                <LinkedInIcon sx={{ color: "#0A66C2" }} />
                <Typography>LinkedIn</Typography>
              </Box>
            </LinkedinShareButton>

            <WhatsappShareButton
              url={shareContent.url}
              title={shareContent.title}
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ cursor: "pointer" }}
              >
                <WhatsAppIcon sx={{ color: "#25D366" }} />
                <Typography>WhatsApp</Typography>
              </Box>
            </WhatsappShareButton>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default ShareButton;
