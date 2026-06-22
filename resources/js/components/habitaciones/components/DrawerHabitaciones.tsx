import { Button, Carousel, Divider, Drawer, Image, Tag } from "antd";
import { X } from "lucide-react";
import { useState } from "react";
import type { Habitacion, HabitacionesPageText, HabitacionImage, HotelInfo } from "../interfaces";
import ComponenteAmenidadesHabitacion from "./ComponenteAmenidadesHabitacion";
import ComponentesHabitacionesMedia from "./ComponenteHabitacionesMedia";
import ComponentePoliticasHotel from "./ComponentePoliticasHotel";

interface DrawerHabitacionesInterface {
  habitacion?: Habitacion;
  open: boolean;
  onClose: () => void;
  hotelInfo: HotelInfo;
  text: HabitacionesPageText;
  scoped?: boolean;
  getDrawerContainer?: () => HTMLElement | null;
}

export default function HabitacionDrawer({ habitacion, open, onClose, hotelInfo, text, scoped = false, getDrawerContainer }: DrawerHabitacionesInterface) {

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const previewImages = habitacion?.images.filter((image) => image.type !== 'video') ?? [];
  const drawerContainer = scoped ? getDrawerContainer?.() : undefined;

	const openImagePreview = (image: HabitacionImage) => {
		const index = previewImages.findIndex((preview) => preview.src === image.src);
		setPreviewIndex(Math.max(index, 0));
		setPreviewOpen(true);
	};

	return (
		<Drawer
			open={open}
			onClose={onClose}
			width={scoped ? 'min(560px, 100%)' : 'min(700px, 180vw)'}
			placement="right"
			destroyOnHidden
			getContainer={scoped ? drawerContainer ?? false : undefined}
			rootStyle={scoped ? { position: 'absolute' } : undefined}
			maskStyle={scoped ? { position: 'absolute' } : undefined}
			className={`habitacion-drawer ${
					scoped ? 'habitacion-drawer-scoped' : ''
			}`}
			rootClassName={`habitacion-drawer-root ${
					scoped ? 'habitacion-drawer-root-scoped' : ''
			}`}
			closable={false}
			title={null}
		>
			{habitacion && (
				<div className="habitacion-drawer-content">
					<button type="button" className="habitacion-drawer-close" onClick={onClose} aria-label="Cerrar detalles">
						<X size={20} />
					</button>

					<section className="habitacion-drawer-hero" aria-label={habitacion.name}>
						<Image.PreviewGroup
							items={previewImages.map((image) => ({
								src: image.src,
								alt: image.alt,
							}))}
							preview={{
								open: previewOpen,
								current: previewIndex,
								onOpenChange: (isOpen) => setPreviewOpen(isOpen),
								onChange: (current) => setPreviewIndex(current),
							}}
						>
							<Carousel autoplay arrows draggable className="habitacion-carousel">
								{habitacion.images.map((image) => (
									<div key={image.id ?? image.src}>
										{image.type === 'video' ? (
											<ComponentesHabitacionesMedia media={image} className="habitacion-hero-image" controls/>
										) : (
											<button
												type="button"
												className="habitacion-hero-preview-button"
												onClick={() =>
													openImagePreview(image)
												}
												aria-label={`${text.image_preview_label} ${habitacion.name}`}
											>
												<ComponentesHabitacionesMedia media={image} className="habitacion-hero-image"/>

												<span>
													{text.image_preview_label}
												</span>
											</button>
										)}
									</div>
								))}
							</Carousel>
						</Image.PreviewGroup>
					</section>

					<section className="habitacion-drawer-main">
						<div className="habitacion-drawer-title">
							<h2>{habitacion.name}</h2>
						</div>

						<p className="habitacion-drawer-description">
							{habitacion.description}
						</p>

						<br />

						<div className="habitacion-detail-section">
							<h3>{text.feature_heading}</h3>
							<div className="habitacion-highlight-list">
								{habitacion.highlights.map((highlight) => (
									<Tag key={highlight} className="habitacion-highlight-tag">
										{highlight}
									</Tag>
								))}
							</div>
						</div>

						<Divider />

						<ComponenteAmenidadesHabitacion habitacion={habitacion} text={text}/>

						<ComponentePoliticasHotel info={hotelInfo} text={text} />

						<div className="habitacion-drawer-actions">
							<Button type="primary" size="large" href="/contacto">
								{text.reserve_cta}
							</Button>
							<Button size="large" href="tel:+523292916330">
								{text.call_cta}
							</Button>
						</div>
					</section>
				</div>
			)}
		</Drawer>
	);
}