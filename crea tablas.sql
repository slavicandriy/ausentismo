-- ####################################################################################################################################################################################
-- ####################################################################################################################################################################################
-- ####################################################################################################################################################################################
-- ####################################################################################################################################################################################

-- tablas y funciones que se crearon para el sistema, no se incluye creacion de tablas preexistentes de RRHH (empleados, areas, plantas)

-- tablas externas al sistema de ausentismo marcadas como sistema_externo_[nombre_tabla]

-- ####################################################################################################################################################################################

CREATE FUNCTION [dbo].[udf_FinesDeSemana](@dtDate1 DATETIME, @dtDate2 DATETIME)
RETURNS int
AS
 BEGIN
 DECLARE @Total INT
 SET @Total = 0
 WHILE @dtDate2 >= @dtDate1
  BEGIN
   IF DATEPART(dw, @dtDate1) = 1 OR DATEPART(dw, @dtDate1) = 7
     SET @Total = @Total + 1
	 SET @dtDate1 = DATEADD(dd, 1, @dtDate1)
	 CONTINUE
  END
  RETURN (@Total)
END
GO

-- ####################################################################################################################################################################################

CREATE TABLE [dbo].[ausentismo_cab](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[legajo] [varchar](50) NOT NULL,
	[id_motivo] [int] NOT NULL,
	[fecha_ausencia] [date] NOT NULL,
	[alta_ausencia] [date] NOT NULL,
	[observaciones] [varchar](max) NULL,
 CONSTRAINT [PK_asistencias_cab] PRIMARY KEY CLUSTERED
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[ausentismo_cab]  WITH CHECK ADD  CONSTRAINT [FK__ausentism__id_mo__6A85CC04] FOREIGN KEY([id_motivo])
REFERENCES [dbo].[ausentismo_motivo] ([id])
GO

ALTER TABLE [dbo].[ausentismo_cab] CHECK CONSTRAINT [FK__ausentism__id_mo__6A85CC04]
GO


-- ####################################################################################################################################################################################

CREATE TABLE [dbo].[ausentismo_motivo](
	[id] [int] NOT NULL,
	[descripcion] [varchar](150) NOT NULL,
 CONSTRAINT [PK_asistencias_motivo] PRIMARY KEY CLUSTERED
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


